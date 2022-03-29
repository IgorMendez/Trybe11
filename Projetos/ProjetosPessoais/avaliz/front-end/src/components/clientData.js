/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useEffect, useState } from 'react';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { format } from 'telefone';
import PropTypes from 'prop-types';
import { steps } from '../structures/structures';
import ContextAvaliz from '../context/contextAvaliz';

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ClientData({ currentStep }) {
  const context = useContext(ContextAvaliz);
  const local = JSON.parse(localStorage.getItem(`${context.data.serviceName}`));
  const [definePeople, setDefinePeople] = useState(false);
  const [email, setEmail] = useState(local && local.Email);
  const [Name, setName] = useState(local && local.Name);
  const [phone, setPhone] = useState(local && local.Phone);
  const [cpfOrCnpj, setCpfOrCnpj] = useState(local && local.cpfCnpj);

  useEffect(() => {
    if (currentStep === 0) {
      const arr2 = ['CPF ou CNPJ inválido', 'CPF ou CNPJ inválido', 'Email Inválido', 'Telefone ou celular inválidos'];
      const arr = [(cpf
        .isValid(cpfOrCnpj) || cnpj
        .isValid(cpfOrCnpj)), regex.test(email), format(phone) !== null];
      context.next = (cpf
        .isValid(cpfOrCnpj) || cnpj
        .isValid(cpfOrCnpj)) && regex.test(email) && format(phone) !== null;
      arr.forEach((ee, i, a) => {
        if (!arr[a.indexOf(ee)] && !context.next) {
          context.error = arr2[a.indexOf(ee)];
        }
      });
    }
    return '';
  }, [email, Name, phone, cpfOrCnpj, context, currentStep]);

  const emailCheck = ({ target }) => {
    if (regex.test(target.value)) {
      context.data.objectFormConstructor({ target: { Email: target.value } });
      setEmail(target.value);
      return;
    }
    context.data.objectFormConstructor({ target: { Email: '' } });
    setEmail(target.value);
  };

  const maskCpfCnpj = (e) => {
    if (cpf.isValid(e.target.value)) {
      e.target.value = cpf.format(e.target.value);
      context.data.objectFormConstructor(e);
      localStorage.setItem('personType', JSON.stringify({ cpf: e.target.value, type: 1 }));
      setCpfOrCnpj(e.target.value);
      return;
    }
    e.target.value = cpf.strip(e.target.value);
    setCpfOrCnpj(e.target.value);
    if (cnpj.isValid(e.target.value)) {
      e.target.value = cnpj.format(e.target.value);
      context.data.objectFormConstructor(e);
      localStorage.setItem('personType', JSON.stringify({ cnpj: e.target.value, type: 2 }));
      setCpfOrCnpj(e.target.value);
      return;
    }
    e.target.value = cnpj.strip(e.target.value);
    setCpfOrCnpj(e.target.value);
    context.data.objectFormConstructor(e);
  };

  const phoneCheckMask = (e) => {
    if (Number(e.target.value[0]) === 0) {
      e.target.value = '';
      return alert('Favor adicionar DDD sem o dígito 0 - ex:11999998888');
    }
    const Phone = format(e.target.value);
    context.data.objectFormConstructor({ target: { Phone } });
    setPhone(Phone);
    if (Phone && e.target.value.length > 8 && e.target.value !== '') {
      e.target.value = Phone;
      setPhone(Phone);
    }
    return '';
  };

  const nameSet = (e) => {
    context.data.objectFormConstructor(e);
    setName(e.target.value);
  };

  const otherPeople = () => (
    <div>
      <div className="animation-container">
        <span className="modeloCampo">
          <input placeholder="Nome completo ou Razão Social" onChange={(e) => context.data.objectFormConstructor(e)} id="nameRecived" className="inputModeloEscrever" required />
        </span>
        <span className="modeloCampo">
          <input
            placeholder="(DDD) 9 0000-0000"
            onChange={(e) => {
              const phoneRecived = format(e.target.value);
              if (Number(e.target.value[0]) === 0) {
                e.target.value = '';
                return alert('Favor adicionar DDD sem o dígito 0 - ex:11999998888');
              }
              if (phoneRecived) {
                context.data.objectFormConstructor({ target: { phoneRecived } });
                e.target.value = phoneRecived;
              }
              return '';
            }}
            id="phoneRecived"
            className="inputModeloEscrever"
            required
          />
        </span>
      </div>
    </div>
  );

  return (
    <>
      {
        steps[currentStep].id === 'CLIENT_DATA' && (
          <>
            <h1 className="tituloFormulario">Dados do Solicitante</h1>
            <hr />
            <div className="clientData animation-container">
              <div>
                <span className="modeloCampo">
                  <input placeholder="Nome completo ou Razão Social" onChange={(e) => nameSet(e)} id="Name" className="inputModeloEscrever" required />
                </span>
                <span className="modeloCampo">
                  <input placeholder="(00) 0000-0000" onChange={(e) => phoneCheckMask(e)} id="Phone" className="inputModeloEscrever" required />
                </span>
                <span className="modeloCampo">
                  <input placeholder="C.P.F." onChange={(e) => maskCpfCnpj(e)} id="cpfCnpj" className="inputModeloEscrever" required />
                </span>
                <span className="modeloCampo">
                  <input placeholder="E-mail" onChange={(e) => emailCheck(e)} id="Email" className="inputModeloEscrever" required />
                </span>
              </div>
              <div id="sameClient">
                <h1 className="tituloFormulario">Dados do Responsável</h1>
                <hr />
                <p id="justify-rigth">
                  O
                  {' '}
                  <strong>RESPONSÁVEL POR MOSTRAR O VEÍCULO</strong>
                  {' '}
                  é a mesma pessoa da solicitação do serviço?
                </p>
                <div className="yes-no-container">
                  <span>
                    <label htmlFor="yes">
                      Sim
                      <input
                        onClick={() => {
                          setDefinePeople(false);
                        }}
                        id="yes"
                        name="sameClient"
                        type="radio"
                        required
                        defaultChecked
                      />
                    </label>
                  </span>
                  <span>
                    <label htmlFor="no">
                      Não
                      <input
                        onClick={() => setDefinePeople(true)}
                        id="no"
                        name="sameClient"
                        type="radio"
                        required
                      />
                    </label>
                  </span>
                </div>
                { definePeople && otherPeople() }
              </div>
            </div>
            <span className="modeloCampoCheckbox perguntaResponsavelServico" />
          </>
        )
      }
    </>
  );
}

ClientData.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
