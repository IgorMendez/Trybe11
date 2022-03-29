import React, { useState, useContext } from 'react';
import ContextAvaliz from '../../context/contextAvaliz';

export default function ExtractSummaryAo() {
  const context = useContext(ContextAvaliz);
  const check = localStorage.getItem('dataCarOk');
  const [carPriceFinal] = useState(49);
  const [totalPriceService] = useState(49);

  const renderExtract = () => {
    if (check) {
      const localSto = JSON.parse(localStorage.getItem(context.data.serviceName));
      const { dataCar } = localSto;
      const {
        placa,
      } = localSto;
      const { Marca, Modelo, AnoModelo } = dataCar;
      return (
        <div className="moreInfo">
          <h1 className="tituloFormulario">Extrato</h1>
          <hr />
          <div className="extract-summary-container">
            <div>
              <span>
                <em>Vistoria Online</em>
                <strong>
                  R$
                  {
                    carPriceFinal.toFixed(2).replace('.', ',')
                  }
                </strong>
              </span>
              <ul>
                <li>{ Marca }</li>
                <li>
                  { Modelo }
                  /
                  { AnoModelo }
                </li>
                <li>
                  Placa:
                  {' '}
                  { placa }
                </li>
              </ul>
            </div>
          </div>
          <div className="total">
            <em>Total:</em>
            <strong>
              R$
              {' '}
              { totalPriceService.toFixed(2, 10).replace('.', ',') }
            </strong>
          </div>
        </div>
      );
    }

    return (
      <div className="moreInfo">
        <h1 className="tituloFormulario">Extrato</h1>
        <hr />
        <div className="extract-summary-container">
          <div>
            <span>
              <em>Vistoria Online</em>
              <strong>
                R$
                {' '}
                { carPriceFinal.toFixed(2).replace('.', ',') }
              </strong>
            </span>
            <ul>
              <li>...</li>
              <li>
                ...
                {' '}
                /
                {' '}
                ...
              </li>
              <li>...</li>
            </ul>
          </div>
        </div>
        <div className="total">
          <em>Total:</em>
          <strong>
            R$
            {' '}
            { totalPriceService.toFixed(2, 10).replace('.', ',') }
          </strong>
        </div>
      </div>
    );
  };

  return (
    <>
      {
        renderExtract()
      }
    </>
  );
}
