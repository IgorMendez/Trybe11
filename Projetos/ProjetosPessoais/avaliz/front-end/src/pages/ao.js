import React, { useContext } from 'react';
import Header from '../components/header';
import ContextAvaliz from '../context/contextAvaliz';
import '../styles/vistoria.css';
import StepsBarAo from '../components/aoc componentes/stepsBarAo';

export default function Aoc() {
  const context = useContext(ContextAvaliz);
  context.data.serviceName = 'ao';
  context.data.linkRef = 'https://avaliz.com/checkouts/checkout/';
  context.data.productId = 10178;

  return (
    <>
      <Header />
      <section className="dadosPrincipais">
        <StepsBarAo />
      </section>
    </>
  );
}
