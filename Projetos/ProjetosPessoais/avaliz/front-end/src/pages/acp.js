import React, { useContext } from 'react';
import Header from '../components/header';
import ContextAvaliz from '../context/contextAvaliz';
import '../styles/vistoria.css';
import StepsBar from '../components/stepsBar';

export default function Aoc() {
  const context = useContext(ContextAvaliz);
  context.data.serviceName = 'acp';
  context.data.linkRef = 'https://avaliz.com/checkouts/checkout-vistoria-cautelar/';
  context.data.productId = 17910;

  return (
    <>
      <Header />
      <section className="dadosPrincipais">
        <StepsBar />
      </section>
    </>
  );
}
