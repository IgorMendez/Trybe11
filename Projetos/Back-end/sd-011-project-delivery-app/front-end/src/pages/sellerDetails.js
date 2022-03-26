import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';

export default function SellerDetails() {
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const { userId, role } = JSON.parse(localStorage.getItem('user'));

    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    myHeaders.append('Authorization', userId);
    myHeaders.append('Authorization2', [role, userId]);
    myHeaders.append('Content-Type', 'application/json');
    return fetch(`http://localhost:3001/orders/${params.id}`, requestOptions)
      .then((result) => result.json())
      .then((e) => {
        setOrder(e);
      })
      .catch((error) => console.log(error));
  }, []);

  const dataId = 'seller_order_details__element-order-details-label-delivery-status';
  return (
    <div>
      <Header />
      {order ? (
        <div>
          <span
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {order.id}

          </span>
          <span
            data-testid="seller_order_details__element-order-details-label-order-date"
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
            data-testid="seller_order_details__button-preparing-check"
            disabled={ order.status !== 'Pendente' }
          >
            PREPARAR PEDIDO

          </button>
          <button
            onClick={ () => {
              navigate('/login');
            } }
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ order.status !== 'Preparando' }
          >
            SAIU PARA ENTREGA
          </button>
        </div>
      ) : ''}
      {order ? order.product.map((el, index) => (
        <div key={ index }>
          <span
            data-testid={
              `seller_order_details__element-order-table-item-number-${index}`
            }
          >
            {index + 1}

          </span>
          <span
            data-testid={ `seller_order_details__element-order-table-name-${index}` }
          >
            {el.name}

          </span>
          <span
            data-testid={
              `seller_order_details__element-order-table-quantity-${index}`
            }
          >
            {el.SalesProduct.quantity}

          </span>
          <span
            data-testid={
              `seller_order_details__element-order-table-unit-price-${index}`
            }
          >
            {Number(el.price).toFixed(2).replace(/\./, ',')}

          </span>
          <span
            data-testid={
              `seller_order_details__element-order-table-sub-total-${index}`
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
        data-testid="seller_order_details__element-order-total-price"
      >
        {order ? Number(order.total_price).toFixed(2).replace(/\./, ',') : ''}
      </span>

    </div>

  );
}
