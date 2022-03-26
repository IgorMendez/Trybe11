import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StoreDelivery from '../context/context';

export default function CardProducts(props) {
  const { product } = props;
  const context = useContext(StoreDelivery);
  const { addToCart } = context;

  const [quantity, setQuantity] = useState(0);
  const [price, setTotalPrice] = useState(0);

  useEffect(() => {
    addToCart(product, quantity, price);
  }, [price]);

  useEffect(() => {
    setTotalPrice(quantity * product.price);
  }, [quantity, product.price]);

  return (
    <div className="products-container">
      <img
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        src={ product.url_image }
        alt={ `bebida ${product.name}` }
        className="product-item-card"
      />
      <div className="name-product-card">
        <div
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          { product.name }
        </div>
        <div
          data-testid={ `customer_products__element-card-price-${product.id}` }
        >
          R$:
          {' '}
          { product.price.replace(/\./, ',') }
        </div>
      </div>
      <input
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
        type="number"
        value={ quantity }
        onChange={ ({ target: { value } }) => setQuantity(+value) }
      />
      <div className="button-container">
        <button
          className="button"
          type="button"
          onClick={ () => setQuantity(quantity + 1) }
          data-testid={ `customer_products__button-card-add-item-${product.id}` }
        >
          +
        </button>
        <button
          className="button"
          type="button"
          onClick={ () => quantity >= 1 && setQuantity(quantity - 1) }
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        >
          -
        </button>
      </div>
    </div>
  );
}

CardProducts.propTypes = ({
  product: PropTypes.object,
  index: PropTypes.number,
}).isRequired;
