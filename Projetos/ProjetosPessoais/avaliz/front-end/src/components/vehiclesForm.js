import React from 'react';
import PropTypes from 'prop-types';
import Fipe from '../api/fipe';
import { steps } from '../structures/structures';

export default function VehiclesForm({ currentStep }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
      steps[currentStep].id === 'VEHICLES_FORM' && (
        <Fipe currentStep={currentStep} />
      )
    }
    </>
  );
}

VehiclesForm.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
