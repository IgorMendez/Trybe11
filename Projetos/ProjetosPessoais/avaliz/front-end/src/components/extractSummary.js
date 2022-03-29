import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ContextAvaliz from '../context/contextAvaliz';
import { fipeComparationPrices, rulesPrices } from '../structures/structures';

export default function ExtractSummary({ currentStep }) {
  const context = useContext(ContextAvaliz);
  const check = localStorage.getItem('dataCarOk');
  const local = JSON.parse(localStorage.getItem(`${context.data.serviceName}km`));
  const [IntervalPrice, setIntervalPrice] = useState();
  const [carPriceFinal, setCarPriceFinal] = useState();
  const [totalPriceService, setTotalPriceService] = useState();

  useEffect(() => {
    if (currentStep > 0) {
      if (local) {
        const serviceTotalPrice = carPriceFinal + Number(local);
        context.data.objectFormConstructor({ target: { serviceTotalPrice } });
        setTotalPriceService(carPriceFinal + Number(local));
        return;
      }
      if (!local) {
        const serviceTotalPrice = carPriceFinal;
        context.data.objectFormConstructor({ target: { serviceTotalPrice } });
        setTotalPriceService(carPriceFinal);
      }
    }
  }, [carPriceFinal, currentStep]);

  useEffect(() => {
    const localSto = JSON.parse(localStorage.getItem(context.data.serviceName));
    if (check && localSto) {
      const { serviceName, dataCar } = localSto;
      const carYear = dataCar.AnoModelo;
      const getToday = moment(new Date()).format('YYYY');
      const diffYear = getToday - carYear;
      if (diffYear <= rulesPrices[serviceName].yearRules.one.year) {
        setCarPriceFinal(IntervalPrice);
        return;
      }
      if (diffYear > rulesPrices[serviceName]
        .yearRules.one.year && diffYear <= rulesPrices[serviceName].yearRules.two.year) {
        setCarPriceFinal(IntervalPrice * rulesPrices[serviceName].yearRules.one.calc);
        return;
      }
      if (diffYear > rulesPrices[serviceName]
        .yearRules.two.year && diffYear <= rulesPrices[serviceName].yearRules.three.year) {
        setCarPriceFinal(IntervalPrice * rulesPrices[serviceName].yearRules.two.calc);
        return;
      }
      if (diffYear > rulesPrices[serviceName]
        .yearRules.three.year && diffYear <= rulesPrices[serviceName].yearRules.four.year) {
        setCarPriceFinal(IntervalPrice * rulesPrices[serviceName].yearRules.three.calc);
        return;
      }
      if (diffYear >= rulesPrices[serviceName].yearRules.four.year && diffYear) {
        setCarPriceFinal(IntervalPrice * rulesPrices[serviceName].yearRules.four.calc);
      }
    }
  }, [IntervalPrice, context, local]);

  useEffect(() => {
    const localSto = JSON.parse(localStorage.getItem(context.data.serviceName));
    if (check && localSto) {
      const { serviceName, dataCar } = localSto;
      const fipePrice = +dataCar.Valor
        .replace('R$ ', '').split(',')[0].replace('.', '');
      if (fipePrice <= fipeComparationPrices.price1) {
        setIntervalPrice(rulesPrices[serviceName].prices.price1);
        return;
      }
      if (fipePrice < fipeComparationPrices.price2 && fipePrice > fipeComparationPrices.price1) {
        setIntervalPrice(rulesPrices[serviceName].prices.price2);
        return;
      }
      if (fipePrice < fipeComparationPrices.price3 && fipePrice > fipeComparationPrices.price2) {
        setIntervalPrice(rulesPrices[serviceName].prices.price3);
        return;
      }
      if (fipePrice < fipeComparationPrices.price4 && fipePrice > fipeComparationPrices.price3) {
        setIntervalPrice(rulesPrices[serviceName].prices.price4);
        return;
      }
      if (fipePrice < fipeComparationPrices.price5 && fipePrice > fipeComparationPrices.price4) {
        setIntervalPrice(rulesPrices[serviceName].prices.price4);
        return;
      }
      if (fipePrice > fipeComparationPrices.price5) {
        setIntervalPrice(rulesPrices[serviceName].prices.price5);
      }
    }
  }, [check, context, local]);

  const renderExtract = () => {
    const localSto = JSON.parse(localStorage.getItem(context.data.serviceName));
    if (check && localSto) {
      const { dataCar } = localSto;
      const {
        placa, City, district, cep, State, address, houseNumber,
        complementAdress,
      } = localSto;
      const { Marca, Modelo, AnoModelo } = dataCar;
      return (
        <div className="moreInfo">
          <h1 className="tituloFormulario">Extrato</h1>
          <hr />
          <div className="extract-summary-container">
            <div>
              <span>
                <em>Vistoria Cautelar</em>
                <strong>
                  R$
                  {
                    carPriceFinal && carPriceFinal.toFixed(2).replace('.', ',')
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
            <div>
              <span>
                <em>Taxa de Deslocamento</em>
                <strong>
                  R$
                  {' '}
                  { local || 'Calculando...' }
                </strong>
              </span>
              <ul>
                <li>
                  { address }
                  ,
                  {' '}
                  { houseNumber }
                  ,
                  {' '}
                  { complementAdress }
                  ,
                  {' '}
                  { district }
                  ,
                  {' '}
                  { City }
                  ,
                  {' '}
                  { State }
                  {' '}
                  -
                  {' '}
                  { cep }
                </li>
              </ul>
            </div>
          </div>
          <div className="total">
            <em>Total:</em>
            <strong>
              R$
              {' '}
              { totalPriceService ? totalPriceService.toFixed(2, 10).replace('.', ',') : 'Calculando' }
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
              <em>Vistoria Cautelar</em>
              <strong>
                R$
                {' '}
                { carPriceFinal && carPriceFinal.toFixed(2).replace('.', ',') }
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
          <div>
            <span>
              <em>Taxa de Deslocamento</em>
              <strong>
                R$
                {' '}
                { local }
              </strong>
            </span>
            <ul>
              <li>...</li>
            </ul>
          </div>
        </div>
        <div className="total">
          <em>Total:</em>
          <strong>
            R$
            {' '}
            { totalPriceService ? totalPriceService.toFixed(2, 10).replace('.', ',') : 'Calculando' }
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

ExtractSummary.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
