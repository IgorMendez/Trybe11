/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextAvaliz from '../../context/contextAvaliz';
import { steps2 } from '../../structures/structures';
import ExtractSummaryAo from './extractSummaryAo';
import ServiceTermsAo from './serviceTermsAo';

export default function MoreInfoAo({ currentStep }) {
  const context = useContext(ContextAvaliz);

  useEffect(() => {
    if (currentStep === 2) {
      context.next = false;
    }
  }, [currentStep]);

  return (
    <>
      {
        steps2[currentStep].id === 'MORE_INFO' && (
          <>
            <div className="extract-no-desktop">
              <ExtractSummaryAo currentStep={currentStep} />
            </div>
            <h1 className="tituloFormulario">Termo de Serviço</h1>
            <hr />
            <span>
              <ServiceTermsAo currentStep={currentStep} />
            </span>
          </>
        )
      }
    </>
  );
}

MoreInfoAo.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
