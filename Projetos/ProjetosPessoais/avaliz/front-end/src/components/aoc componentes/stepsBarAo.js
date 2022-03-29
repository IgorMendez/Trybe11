/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, { useState, useContext, useEffect } from 'react';
import ContextAvaliz from '../../context/contextAvaliz';
import VehiclesFormAo from './vehiclesFormAo';
import ClientDataAo from './clientDataAo';
import MoreInfoAo from './moreInfoAo';
import { steps2 } from '../../structures/structures';
import ButtonCheckout from './ButtonCheckoutAo';
import GoogleMapsContainer from '../../api/googleMapsContainer';
import ExtractSummaryAo from './extractSummaryAo';

export default function stepBarAo() {
  const context = useContext(ContextAvaliz);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    if (document.getElementById('map')) {
      const oi = new window.google
        .maps
        .Map(
          document.getElementById('map'),
          {
            center: {
              lat: -15.855459, lng: -47.990506,
            },
            zoom: 10,
          },
        );
      return oi;
    }
  }, []);

  // Persistência de dados e atualização de estado para prosseguir etapas.
  useEffect(() => {
    const arrChildrens = [...document
      .getElementsByClassName('inputModeloEscrever')];
    const { serviceName } = context.data;
    const local = localStorage
      .getItem(`${serviceName}`);
    if (local) {
      arrChildrens.forEach((el) => {
        if (JSON.parse(local)[el.id] && el.value === '') {
          el.value = JSON.parse(local)[el.id];
        }
      });
    }
    const arrChildrens2 = [...document
      .getElementsByClassName('inputModeloEscreverNo')];
    if (local) {
      return arrChildrens2.forEach((el) => {
        if (JSON.parse(local)[el.id] && el.value === '') {
          el.value = JSON.parse(local)[el.id];
        }
      });
    }
  }, [currentStep, context]);

  // Botão next step
  function handleNextStep() {
    if (!context.next) {
      if (context.error) {
        return alert(context.error);
      }
      return alert('Preencha todos os campos obrigatórios*');
    }
    context.data.objectFormConstructor({ target: { serviceName: 'acp' } });
    setCurrentStep(currentStep + 1);
  }

  // botão previous step
  function handlePreviousStep() {
    context.next = true;
    setCurrentStep(currentStep - 1);
  }

  return (
    <>
      <div id="steps-bar">
        <p className={ `step-${currentStep}` }></p>
      </div>
      <div className="components-extract-container">
        <form className="components-container fixed-container">
          {/* ordem 1 */ }
          <ClientDataAo currentStep={ currentStep } />
          {/* ordem 2 */ }
          <VehiclesFormAo currentStep={ currentStep } />
          {/* ordem 4 */ }
          <MoreInfoAo currentStep={ currentStep } />
          <section hidden id="map-container">
            <GoogleMapsContainer />
          </section>
        </form>
        <div className="extract-container-step-bar">
          <ExtractSummaryAo currentStep={ currentStep } />
        </div>
      </div>
      <div className="fixed-div">
        <div className="bottom-buttons-container">
          <button hidden={ currentStep === 0 } type="button" className="bottom-buttons back-step" onClick={ () => handlePreviousStep() }>
            Voltar
          </button>
          {
            (currentStep !== 2)
              ? (
                <button disabled={ !(currentStep < steps2.length - 1) } type="button" className="bottom-buttons next-step" onClick={ () => handleNextStep() }>
                  Avançar
                </button>
              )
              : <ButtonCheckout />
          }
        </div>
      </div>
    </>
  );
}
