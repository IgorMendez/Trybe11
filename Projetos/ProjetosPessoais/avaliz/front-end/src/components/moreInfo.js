/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextAvaliz from '../context/contextAvaliz';
import { steps } from '../structures/structures';
import ExtractSummary from './extractSummary';
import ServiceTerms from './serviceTerms';

export default function MoreInfo({ currentStep }) {
  const context = useContext(ContextAvaliz);

  useEffect(() => {
    if (currentStep === 3) {
      context.next = false;
    }
  }, [currentStep]);

  return (
    <>
      {
        steps[currentStep].id === 'MORE_INFO' && (
          <>
            <div className="extract-no-desktop">
              <ExtractSummary currentStep={currentStep} />
            </div>
            <h1 className="tituloFormulario">Termo de Serviço</h1>
            <hr />
            <span>
              <ServiceTerms currentStep={currentStep} />
            </span>
          </>
        )
      }
    </>
  );
}

MoreInfo.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
