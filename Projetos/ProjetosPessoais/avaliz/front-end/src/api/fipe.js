/* eslint-disable no-param-reassign */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextAvaliz from '../context/contextAvaliz';

export default function Fipe({ currentStep }) {
  // // Contexto
  const context = useContext(ContextAvaliz);
  // // States para requisições
  const [brands] = useState(context.brands);
  const [models, setModel] = useState();
  const [idBrand, setIdBrand] = useState();
  const [idModel, setIdModel] = useState();
  const [idYear, setIdYear] = useState(null);
  const [years, setYears] = useState(null);
  const [dataCar2, setDataCar2] = useState(context.data.clienteData.dataCar || null);
  const [dadosCarro, setDadosCarro] = useState(null);
  const check = localStorage.getItem('dataCarOk');

  useEffect(() => {
    if (currentStep === 1 && check) {
      context.next = check;
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep > 0 && dataCar2) {
      setDadosCarro([dataCar2, {
        placa: context.data.clienteData.placa,
        valorEstimado: context.data.clienteData.valorEstimadoCliente,
        obsTextArea: context.data.clienteData.obsTextArea,
      }]);
      localStorage.setItem('dataCarOk', true);
      context.data.objectFormConstructor({ target: { carBool: true } });
      setDadosCarro(true);
    }
  }, [dataCar2]);

  useEffect(() => {
    if (!check) {
      context.next = false;
      context.error = 'Favor selecionar uma marca';
    }
  }, []);

  useEffect(() => {
    if (check && currentStep === 1) {
      context.next = true;
    }
  }, [idYear, context, dadosCarro]);

  useEffect(() => {
    if (idYear) {
      try {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idBrand}/modelos/${idModel}/anos/${idYear}`)
          .then((response) => response.text())
          .then((result) => {
            const dataCar = JSON.parse(result);
            context.data.objectFormConstructor({ target: { dataCar } });
            setDataCar2(dataCar);
          })
          .catch((error) => console.log('error', error));
      } catch (err) {
        alert('Dados não encontrados');
        setDataCar2();
      }
    }
  }, [idYear]);

  // // funções de requisições a api
  const findModels = ({ target }) => {
    const { value } = target;
    try {
      fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brands.find((e) => e.nome === value).codigo}/modelos`)
        .then((response) => response.text())
        .then((result) => setModel(JSON.parse(result)));
      setIdBrand(brands.find((e) => e.nome === value).codigo);
      context.error = 'Favor selecionar um modelo';
      return;
    } catch (err) {
      alert('Modelos não encontrados');
      setModel();
    }
  };

  const findYear = ({ target }) => {
    const { value } = target;
    try {
      fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idBrand}/modelos/${models.modelos.find((e) => e.nome === value).codigo}/anos`)
        .then((response) => response.text())
        .then((result) => setYears(JSON.parse(result)))
        .catch((error) => console.log('error', error));
      setIdModel(models.modelos.find((e) => e.nome === value).codigo);
      context.error = 'Favor selecionar um ano';
      return;
    } catch (err) {
      alert('Anos não encontrados');
      setYears();
    }
  };

  function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(valor);
  }

  function mascaraMoeda(event) {
    const onlyDigits = event.target.value
      .split('')
      .filter((s) => /\d/.test(s))
      .join('')
      .padStart(3, '0');
    const digitsFloat = `${onlyDigits.slice(0, -2)}.${onlyDigits.slice(-2)}`;
    const valorEstimadoCliente = maskCurrency(digitsFloat);
    context.data.objectFormConstructor({ target: { valorEstimadoCliente } });
    event.target.value = valorEstimadoCliente;
  }

  function maskPlaca({ target }) {
    if (target.value.length === 7) {
      const regexPlaca = /^([a-zA-Z]{3})-*([0-9]{1})-*([a-zA-Z]{1})-*([0-9]{1})/;
      const regexPlaca2 = /^([a-zA-Z]{3})-*([0-9]{3})/;
      if (regexPlaca2.test(target.value)) {
        const placa = target.value.replace(regexPlaca2, '$1-$2').toUpperCase();
        context.data.objectFormConstructor({ target: { placa } });
        target.value = placa;
        return;
      }
      if (regexPlaca.test(target.value)) {
        const placa = target.value.replace(regexPlaca, '$1-$2$3$4').toUpperCase();
        context.data.objectFormConstructor({ target: { placa } });
        target.value = placa;
        return;
      }
      target.value = '';
      alert('Placa inválida');
    }
  }

  return (
    <>
      <h1 className="tituloFormulario">Informações do Veículo</h1>
      <hr />
      <div className="vehiclesForm animation-container">
        { (
          // { dadosCarro && (
          <div className="fipe-container">
            <span className="modeloCampo">
              <select className="inputModeloEscrever inputModeloEscreverSelect fipe-options" id="brand" onChange={(e) => findModels(e)}>
                <option>Marca</option>
                {
                  brands ? brands.map((brand, i) => (
                    <option key={`${i + i}`} id={brand.nome}>{ brand.nome }</option>
                  )) : '...'
                }
              </select>
            </span>
            <span className="modeloCampo">
              <select className="inputModeloEscrever inputModeloEscreverSelect fipe-options" id="modelCar" onChange={(e) => findYear(e)}>
                <option>Modelo</option>
                {
                  models ? models.modelos.map((model, i) => (
                    <option key={`${i + i}`} id={model.nome}>{ model.nome }</option>
                  )) : ''
                }
              </select>
            </span>
            <span className="modeloCampo">
              <select
                className="inputModeloEscrever inputModeloEscreverSelect fipe-options"
                id="yearCar"
                onChange={(e) => {
                  setIdYear(years.find((el) => el.nome.split(' ')[0] === e.target.value).codigo);
                }}
              >
                <option>Ano</option>
                {
                  years ? years.map((year, i) => (
                    <option key={`${i + 1}`} id={year.nome}>{ year.nome.split(' ')[0] }</option>
                  )) : ''
                }
              </select>
            </span>
            <div className="platePrice">
              <span className="modeloCampo">
                <input
                  placeholder="Placa"
                  maxLength={7}
                  onChange={(e) => maskPlaca(e)}
                  id="placa"
                  className="inputModeloEscrever inputModeloEscreverNotRequired"
                />
              </span>
              <span className="modeloCampo">
                <input
                  placeholder="R$ 00,00"
                  onChange={(e) => mascaraMoeda(e)}
                  id="price"
                  className="inputModeloEscrever inputModeloEscreverNotRequired"
                />
              </span>
            </div>
            <textarea
              placeholder="Observações adicionais"
              className="obsTextArea"
              id="mais-info-veiculos"
              onChange={(e) => context.data.objectFormConstructor(e)}
            />
          </div>
        ) }
      </div>
    </>
  );
}

Fipe.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
