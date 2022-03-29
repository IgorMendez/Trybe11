/* eslint-disable brace-style */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ContextAvaliz from '../context/contextAvaliz';
import { steps, pathsCoord } from '../structures/structures';

export default function DataAdress({ currentStep }) {
  const context = useContext(ContextAvaliz);
  const local = JSON.parse(localStorage.getItem(`${context.data.serviceName}dataAddress`));
  const [logradouro, setLogradouro] = useState(local);
  const [district, setDistrict] = useState(local);
  const [city, setCity] = useState(local);
  const [state, setState] = useState(local);
  const [date, setDate] = useState(local);
  const [hour, setHour] = useState(local);
  const [houseNumber, setHouseNumber] = useState(local);
  const [cepInput, setCep] = useState();
  const [locals, setLocals] = useState();
  const [clientCoordinates, setClientCoordinates] = useState();
  const [IsInPolygon, setIsInPolygon] = useState();
  useEffect(() => {
    if (currentStep === 2) {
      setHouseNumber();
      const houseNumberClear = '';
      context.data.objectFormConstructor({ target: { houseNumber: houseNumberClear } });
      document.getElementById('houseNumber').value = '';
    }
  }, [cepInput, logradouro]);

  useEffect(() => {
    if (currentStep === 2 && local) {
      context.next = local[0] || false;
    }
  }, [currentStep, local]);

  useEffect(() => {
    if (currentStep === 2
      && logradouro && district && city && state && date && hour && houseNumber) {
      try {
        localStorage.setItem(`${context.data.serviceName}dataAddress`, JSON.stringify([true, {
          logradouro, district, city, state, date, hour, houseNumber,
        }]));
        return;
      } catch (er) {
        console.log(er);
      }
      return;
    }
    if (currentStep === 2) {
      localStorage.setItem(`${context.data.serviceName}dataAddress`, JSON.stringify([false]));
    }
  }, [logradouro, houseNumber, district, city, state, date, hour, currentStep, cepInput]);

  useEffect(() => {
    if (currentStep === 2 && IsInPolygon) {
      localStorage.setItem(`${context.data.serviceName}km`, JSON.stringify(0));
      return;
    }
    if (currentStep === 2 && !IsInPolygon) {
      const calc = pathsCoord.map((el) => {
        const R = 6371;
        const dLat = (el.lat - clientCoordinates.lat) * (Math.PI / 180);
        const dLon = (el.lng - clientCoordinates.lng) * (Math.PI / 180);
        const a = Math
          .sin(dLat / 2) * Math
          .sin(dLat / 2) + Math
          .cos(el.lat * (Math.PI / 180)) * Math
          .cos(clientCoordinates.lat * (Math.PI / 180)) * Math
          .sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return { coord: el, d };
      });
      const result = calc.filter((el) => el.d === Math.min(...calc.map((e) => e.d)));
      console.log(result)
      const optionss = {
        origin: result[0].coord,
        destination: clientCoordinates,
        travelMode: 'DRIVING',
      };
      const getDirection = new window.google.maps.DirectionsService();
      getDirection.route(optionss)
        .then((e) => {
          if (e.status === 'OK') {
            localStorage.setItem(`${context.data.serviceName}km`, JSON.stringify(((e.routes[0].legs[0].distance.value / 1000) * 8).toFixed(2)));
            context.data.objectFormConstructor({ target: { a: '' } });
            console.log(e.routes[0].legs[0].distance.value)
          }
        });
    }
  }, [clientCoordinates, IsInPolygon]);

  useEffect(() => {
    const arrChildrens2 = [...document.getElementsByClassName('inputModeloEscrever')].map((e) => e);
    const ever2 = arrChildrens2.every((e) => e.value !== '');
    if (currentStep === 2 && ever2) {
      const {
        address,
        City,
      } = context.data.clienteData;
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        enderecoCompleto: `${address} ${houseNumber} ${City} ${district}`,
      });

      const options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      return fetch('/structures', options)
        .then((res) => res.json())
        .then((data) => setClientCoordinates(data));
    }
    return '';
  }, [locals, houseNumber, hour, date]);

  useEffect(() => {
    const arrChildrens2 = [...document.getElementsByClassName('inputModeloEscrever')].map((e) => e);
    const ever2 = arrChildrens2.every((e) => e.value !== '');
    if (currentStep === 2 && ever2 && clientCoordinates) {
      const { structures } = context;
      const map3 = new window.google.maps.Map(document.getElementById('map'));
      if (structures) {
        const { paths } = structures;
        const parsed = JSON.parse(paths);
        const rightShoulderFront = new window.google.maps.Polygon({
          parsed,
        });
        rightShoulderFront.setMap(map3);
        const verifyPolyContainsClient = window.google.maps.geometry;
        if (verifyPolyContainsClient) {
          const result = verifyPolyContainsClient
            .poly.containsLocation(clientCoordinates, rightShoulderFront);
          setIsInPolygon(result);
          return '';
        }
        return '';
      }
      return '';
    }
    return '';
  }, [clientCoordinates]);

  useEffect(() => {
    if (locals) {
      const dataAddress = {
        address: locals.logradouro,
        district: locals.bairro,
        City: locals.localidade,
        State: locals.uf,
        cep: locals.cep,
      };
      context.data.objectFormConstructor({ target: { dataAddress } });
    }
  }, [locals]);

  useEffect(() => {
    function limpaFormulárioCep() {
      // Limpa valores do formulário de cep.
      document.getElementById('address').value = ('');
      document.getElementById('district').value = ('');
      document.getElementById('City').value = ('');
      document.getElementById('State').value = ('');
      document.getElementById('houseNumber').value = ('');
    }

    function meuCallback(conteudo) {
      if (!('erro' in conteudo)) {
        // Atualiza os campos com os valores.
        setLogradouro(conteudo.logradouro);
        setDistrict(conteudo.bairro);
        setCity(conteudo.localidade);
        setState(conteudo.uf);
        document.getElementById('address').value = (conteudo.logradouro);
        document.getElementById('district').value = (conteudo.bairro);
        document.getElementById('City').value = (conteudo.localidade);
        document.getElementById('State').value = (conteudo.uf);
        setLocals(conteudo);
      }
      // end if.
      else {
        // CEP não Encontrado.
        limpaFormulárioCep();
        alert('CEP não encontrado.');
      }
    }
    if (cepInput) {
      // Nova constiável "cep" somente com dígitos.

      // Verifica se campo cep possui valor informado.
      const cep = cepInput.replace(/\D/g, '');
      if (cep !== '') {
        // Expressão regular para validar o CEP.
        const validacep = /^[0-9]{8}$/;

        // Valida o formato do CEP.
        if (validacep.test(cep)) {
          // Preenche os campos com "..." enquanto consulta webservice.
          document.getElementById('address').value = '...';
          document.getElementById('district').value = '...';
          document.getElementById('City').value = '...';
          document.getElementById('State').value = '...';

          fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((el) => el.json())
            .then((result) => meuCallback(result));
        } // end if.
        else {
          // cep é inválido.
          limpaFormulárioCep();
          alert('Formato de CEP inválido.');
        }
      } // end if.
      else {
        // cep sem valor, limpa formulário.
        limpaFormulárioCep();
      }
    }
  }, [cepInput]);

  const getAddress = (e) => {
    const re = /^([0-9]{5})-*([0-9]{3})/;
    const re2 = /[a-z]/g;
    if (re2.test(e.target.value)) {
      e.target.value = '';
      return alert('CEP inválido');
    }
    const oi = e.target.value.replace(re, '$1-$2');
    e.target.value = oi;
    if (oi.length === 9) {
      setCep(oi);
    }
    return '';
  };

  return (
    <>
      {
        steps[currentStep].id === 'DATA_ADRESS' && (
          <>
            <h1 className="tituloFormulario">Agendamento</h1>
            <hr />
            <div id="data_address" className="dataAddress animation-container">
              <div>
                <span className="modeloCampo">
                  <input
                    name="CEP"
                    maxLength={9}
                    placeholder="CEP"
                    id="cep"
                    className="inputModeloEscrever"
                    onChange={(e) => {
                      getAddress(e);
                    }}
                  />
                </span>
                <span className="modeloCampo">
                  <input
                    name="Logradouro"
                    placeholder="Logradouro"
                    id="address"
                    className="whithoutIndent inputModeloEscrever"
                    onChange={(e) => {
                      setLogradouro(e.target.value);
                      context.data.objectFormConstructor(e);
                    }}
                  />
                </span>
                <div className="camposDivididos">
                  <span className="modeloCampo">
                    <input
                      name="Número"
                      placeholder="Número"
                      id="houseNumber"
                      className="whithoutIndent inputModeloEscrever"
                      onChange={(e) => {
                        setHouseNumber(e.target.value);
                        return context.data.objectFormConstructor(e);
                      }}
                    />
                  </span>
                  <span className="modeloCampo">
                    <input
                      placeholder="Complemento"
                      id="complementAdress"
                      className="whithoutIndent inputModeloEscreverNo"
                      onChange={(e) => context.data.objectFormConstructor(e)}
                    />
                  </span>
                </div>
                <span className="modeloCampo">
                  <input
                    name="Bairro"
                    placeholder="Bairro"
                    id="district"
                    className="whithoutIndent inputModeloEscrever"
                    onInput={(e) => {
                      setDistrict(e.target.value);
                      context.data.objectFormConstructor(e);
                    }}
                  />
                </span>
                <div className="camposDivididos">
                  <span className="modeloCampo">
                    <input
                      name="Cidade"
                      placeholder="Cidade"
                      id="City"
                      className="whithoutIndent inputModeloEscrever"
                      onChange={(e) => {
                        setCity(e.target.value);
                        context.data.objectFormConstructor(e);
                      }}
                    />
                  </span>
                  <span className="modeloCampo">
                    <input
                      name="Estado"
                      placeholder="Estado"
                      id="State"
                      className="whithoutIndent inputModeloEscrever"
                      onChange={(e) => {
                        setState(e.target.value);
                        context.data.objectFormConstructor(e);
                      }}
                    />
                  </span>
                </div>
                <div className="camposDivididos">
                  <span className="modeloCampo">
                    <input
                      name="Data"
                      placeholder="Data da vistoria"
                      type="date"
                      id="date"
                      min={moment(new Date()).format('YYYY-MM-DD')}
                      className="whithoutIndent inputModeloEscrever"
                      onChange={(e) => {
                        setDate(e.target.value);
                        context.data.objectFormConstructor(e);
                      }}
                    />
                  </span>
                  <span className="modeloCampo">
                    <input
                      name="Hora"
                      placeholder="Hora da vistoria"
                      type="time"
                      id="hour"
                      className="whithoutIndent inputModeloEscrever"
                      onChange={(e) => {
                        setHour(e.target.value);
                        context.data.objectFormConstructor(e);
                      }}
                    />
                  </span>
                </div>
                <textarea
                  placeholder="Observações adicionais"
                  className="obsTextArea"
                  id="mais-info-address"
                  onChange={(e) => context.data.objectFormConstructor(e)}
                />
              </div>
            </div>
          </>
        )
      }
    </>
  );
}

DataAdress.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
