import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ContextAvaliz from '../../context/contextAvaliz';
import { ServiceTermText } from '../../structures/structures';

export default function ServiceTerms({ currentStep }) {
  const context = useContext(ContextAvaliz);
  const [term, setTerm] = useState();

  useEffect(() => {
    if (term && currentStep === 2) {
      context.next = true;
    }
    return () => {
      context.data.clienteData.checkout = false;
    };
  }, [term, currentStep]);

  return (
    <span className="serviceTerms animation-container">
      <textarea className="obsTextArea2" defaultValue={ServiceTermText} />
      <br />
      <span className="modeloCampoCheckbox">
        <label htmlFor="accept" id="accept-terms">
          EU CONCORDO COM O TERMO DE CIÊNCIA DO CONTRATANTE.*
          <input
            onChange={(e) => {
              if (!e.target.checked) {
                setTerm();
              }
            }}
            onClick={(e) => {
              const { userAgent } = e.view.clientInformation;
              const documentSign = {
                Date: moment(new Date()).format('DD/MM/YYYY, h:mm:ss a'),
                'Page-URL': e.view.location.href,
                userAgent,
              };
              setTerm(documentSign);
              context.data
                .objectFormConstructor({ target: { documentSign, checkout: e.target.checked } });
            }}
            id="accept"
            type="checkbox"
          />
        </label>
      </span>
      <br />
    </span>
  );
}

ServiceTerms.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
