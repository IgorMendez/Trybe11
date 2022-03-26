import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Index from './pages/index';
import ProviderDelivery from './context/provider';

function App() {
  return (
    <ProviderDelivery>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </ProviderDelivery>
  );
}

export default App;
