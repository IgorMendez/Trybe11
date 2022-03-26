import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreDelivery from '../context/context';
import Header from '../components/Header';
import CardProduct from '../components/CardProduct';

export default function Products() {
  const context = useContext(StoreDelivery);
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    context.products = products;
  }, [context.products, products]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'token');

    const requestOptions = {
      headers: myHeaders,
      method: 'GET',
    };
    fetch('http://localhost:3001/products', requestOptions)
      .then((result) => result.json())
      .then((a) => setProducts(a));
  }, []);

  return (
    <section className="section-products-container">
      <Header />
      <h1>Produtos</h1>
      {
        products
          ? products.map(
            (product, index) => <CardProduct product={ product } key={ index } />,
          )
          : <p>Loading</p>
      }
      <div className="oi">
        <button
          className="button font-size"
          type="button"
          onClick={ () => {
            localStorage.setItem('cart', JSON
              .stringify({ cart: context.cart, totalPrice: context.totalPrice }));
            navigate('/customer/checkout');
          } }
          data-testid="customer_products__button-cart"
          disabled={ (context.totalPrice.toFixed(2).replace(/\./, ',') === '0,00') }
        >
          Ver Carrinho: R$
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { context.totalPrice.toFixed(2).replace(/\./, ',') }
          </span>
        </button>
      </div>
    </section>
  );
}
