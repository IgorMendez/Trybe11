import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
// import { pathsCoord } from '../structures/structures';
import ContextAvaliz from './contextAvaliz';

function AvalizProvider({ children }) {
  const [clienteData, setClientData] = useState();
  const [brandsProvider, setBrandsProvider] = useState();
  const [structures, setStructures] = useState();
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const options = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch('/structures', options)
      .then((res) => res.json())
      .then((data) => setStructures(data));
  }, []);

  useEffect(() => {
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then((response) => response.text())
      .then((result) => setBrandsProvider(JSON.parse(result)))
      .catch((error) => console.log({ Erro: 'Marcas não encontradas', error }));
  }, []);

  const objectFormConstructor = async ({ target }) => {
    const { value } = target;
    const { id } = target;
    if (target.dataAddress) {
      setClientData({ ...clienteData, ...target.dataAddress });
      return;
    }
    if (!id) {
      setClientData({ ...clienteData, ...target });
      return;
    }
    if (id) {
      setClientData({ ...clienteData, [id]: value });
    }
  };

  // const context = ;

  const context = useMemo(() => ({
    next: false,
    structures,
    placa: '',
    data: {
      serviceName: '',
      objectFormConstructor,
      clienteData,
    },
    brands: brandsProvider,
  }), [clienteData, brandsProvider]);

  useEffect(() => {
    const { serviceName } = context.data;
    const local = localStorage.getItem(`${serviceName}`);
    setClientData(JSON.parse(local));
  }, []);

  useEffect(() => {
    const { serviceName } = context.data;
    if (clienteData) {
      localStorage.setItem(`${serviceName}`, JSON.stringify(clienteData));
    }
  }, [clienteData]);

  return (
    <ContextAvaliz.Provider value={context}>
      { children }
    </ContextAvaliz.Provider>
  );
}

AvalizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AvalizProvider;
