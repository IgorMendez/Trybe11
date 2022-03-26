import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';
import StoreDelivery from '../context/context';

export default function Details() {
  const context = useContext(StoreDelivery);
  const [order] = useState(context.order);
  const navigate = useNavigate();

  const dataId = 'customer_order_details__element-order-details-label-delivery-status';
  return (
    <div>
      <Header />
      {order ? (
        <div>
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {order.id}

          </span>
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {order.users.name}
          </span>
          <span
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {moment(order.sale_date).format('DD/MM/YYYY')}

          </span>
          <span
            data-testid={ dataId }
          >
            {order.status}

          </span>
          <button
            onClick={ () => {
              navigate('/login');
            } }
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ order.status !== 'Em Trânsito' }
          >
            Marcar como entregue

          </button>
        </div>
      ) : ''}
      {order ? order.product.map((el, index) => (
        <div key={ index }>
          <span
            data-testid={
              `customer_order_details__element-order-table-item-number-${index}`
            }
          >
            {index + 1}

          </span>
          <span
            data-testid={ `customer_order_details__element-order-table-name-${index}` }
          >
            {el.name}

          </span>
          <span
            data-testid={
              `customer_order_details__element-order-table-quantity-${index}`
            }
          >
            {el.SalesProduct.quantity}

          </span>
          <span
            data-testid={ `customer_order_details__element-order-total-price-${index}` }
          >
            {Number(el.price).toFixed(2).replace(/\./, ',')}

          </span>
          <span
            data-testid={
              `customer_order_details__element-order-table-sub-total-${index}`
            }
          >
            {
              (Number(el.price)
              * Number(el.SalesProduct.quantity)).toFixed(2).replace(/\./, ',')
            }

          </span>
        </div>
      )) : ''}
      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        {order ? Number(context
          .order.total_price).toFixed(2).replace(/\./, ',') : ''}
      </span>

    </div>
  );
}
