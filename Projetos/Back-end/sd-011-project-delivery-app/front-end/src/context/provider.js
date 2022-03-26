import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import Context from './context';

export default function Provider({ children }) {
  const [cart, setCart] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [sellers, setSellers] = React.useState([]);

  const addToCart = (product, quantity, price) => {
    const newCart = cart.filter((item) => item.product.id !== product.id);
    return setCart([...newCart, { product, quantity, price }]);
  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'token');
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch('http://localhost:3001/login', requestOptions)
      .then((result) => result.json())
      .then((result) => setSellers(result))
      .catch((e) => console.log({ Error: `${e} Deu ruim` }));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const myHeaders = new Headers();
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      myHeaders.append('Authorization2', [user.role, user.userId]);
      myHeaders.append('Content-Type', 'application/json');
      fetch('http://localhost:3001/orders', requestOptions)
        .then((result) => result.json())
        .then((e) => {
          setOrders(e);
        });
    }
  }, []);

  const store = {
    cart,
    addToCart,
    orders,
    totalPrice: cart
      .reduce((acc, item) => acc + item.price, 0),
    sellers };
  return (
    <Context.Provider value={ store }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};
