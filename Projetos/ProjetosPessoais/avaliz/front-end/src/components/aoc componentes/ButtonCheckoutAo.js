import React, { useContext } from 'react';
import ContextAvaliz from '../../context/contextAvaliz';

export default function ButtonCheckoutAo() {
  const context = useContext(ContextAvaliz);
  const { data } = context;

  function finalizaFormulario() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const getPersonType = localStorage.getItem('personType');
    const sendData = [getPersonType, data];
    const options = {
      method: 'POST',
      body: JSON.stringify(sendData),
      headers: myHeaders,
    };
    fetch('/checkout', options)
      .then((e) => e.json())
      .then((result) => {
        localStorage.removeItem(`${context.data.serviceName}`);
        localStorage.removeItem(`${context.data.serviceName}dataAddress`);
        localStorage.removeItem(`${context.data.serviceName}km`);
        localStorage.removeItem('dataCarOk');
        localStorage.removeItem('personType');
        window.location.href = result.link;
      })
      .catch((e) => console.log(e));
  }

  return (
    <button
      type="button"
      disabled={data.clienteData ? !data.clienteData.checkout : true}
      className="bottom-buttons next-step"
      onClick={() => finalizaFormulario()}
    >
      Pagar
    </button>
  );
}
