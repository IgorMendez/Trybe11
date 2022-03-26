import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreDelivery from '../context/context';
import Header from '../components/Header';

export default function ClientCheckout() {
  const localStorageValue = JSON.parse(localStorage.getItem('cart'));
  const context = useContext(StoreDelivery);
  const navigate = useNavigate();
  const getCart = () => localStorageValue
    .cart.filter((item) => item.quantity !== 0);
  const [products, setProducts] = useState(getCart());
  const [seller, setSeller] = useState(context.sellers[0].id);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

  const remove = ({ target }) => {
    const cart = products.filter((item) => {
      const teste = item.product.id !== +target.id;
      return teste;
    });
    setProducts(cart);
    localStorage.setItem('cart', JSON.stringify(
      { cart,
        totalPrice: Number(localStorageValue
          .totalPrice).toFixed(2) - Number(target.getAttribute('price')).toFixed(2),
      },
    ));
    context.cart = [];
    context.totalPrice = 0;
  };

  const putNewSale = () => {
    const { role, userId, token } = JSON.parse(localStorage.getItem('user'));
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    myHeaders.append('Authorization2', [userId, role]);
    const obj = JSON.stringify(
      {
        total_price: Number(localStorageValue.totalPrice).toFixed(2),
        user_id: userId,
        seller_id: seller,
        delivery_address: address,
        delivery_number: addressNumber,
        status: 'Pendente',
        products },
    );
    const requestOptions = {
      headers: myHeaders,
      method: 'POST',
      body: obj,
    };
    fetch('http://localhost:3001/orders', requestOptions)
      .then((result) => result.json())
      .then((a) => {
        context.order = a;
        return navigate(`/customer/orders/${a.id}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Header />
      <h1>Finalizar pedido</h1>
      <div>
        { products
        && products.map((item, i) => (
          <div key={ i }>
            <span
              data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
            >
              { i + 1}
            </span>
            <span
              data-testid={ `customer_checkout__element-order-table-name-${i}` }
            >
              { item.product.name }
            </span>
            <span
              data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
            >
              { item.quantity }
            </span>
            <span
              data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
            >
              { Number(item.product.price).toFixed(2).replace(/\./, ',') }
            </span>
            <span
              data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
            >
              { Number(item.price).toFixed(2).replace(/\./, ',') }
            </span>
            <button
              price={ item.price }
              id={ item.product.id }
              type="button"
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
              onClick={ (e) => remove(e) }
            >
              Remover
            </button>

          </div>))}
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          { localStorageValue.totalPrice.toFixed(2).replace(/\./, ',') }
        </p>
      </div>
      <div>
        <select
          data-testid="customer_checkout__select-seller"
          onClick={ (event) => setSeller(event.target.value) }
        >
          {context.sellers.map((e, index) => (
            <option
              key={ index }
              value={ e.id }
            >
              {e.name}
            </option>
          ))}
        </select>
        <input
          data-testid="customer_checkout__input-address"
          onChange={ (e) => setAddress(e.target.value) }
        />
        <input
          data-testid="customer_checkout__input-addressNumber"
          onChange={ (e) => setAddressNumber(e.target.value) }
        />
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => {
            putNewSale();
            localStorage.removeItem('cart');
          } }
          disabled={ address.length === 0 || addressNumber.length === 0 }
        >
          Finalizar pedido
        </button>
      </div>
    </div>
  );
}
