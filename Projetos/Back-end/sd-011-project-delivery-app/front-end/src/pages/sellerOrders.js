import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function OrderSeller() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const myHeaders = new Headers();
    myHeaders.append('Authorization2', [user.role, user.userId]);

    const requestOptions = {
      headers: myHeaders,
      method: 'GET',
    };
    fetch('http://localhost:3001/orders', requestOptions)
      .then((result) => result.json())
      .then((a) => setOrders(a));
  }, []);

  return (
    <div>
      <Header />
      {
        orders && orders.map((order, index) => (
          <div
            key={ index }
            onClick={ () => navigate(`/seller/orders/${order.id}`) }
            onKeyPress={ () => navigate(`/seller/orders/${order.id}`) }
            role="button"
            tabIndex="0"
          >
            <p
              data-testid={ `seller_orders__element-order-id-${order.id}` }
            >
              { order.id }
            </p>
            <p
              data-testid={ `seller_orders__element-card-price-${order.id}` }
            >
              { order.total_price }
            </p>
            <p
              data-testid={ `seller_orders__element-card-address-${order.id}` }
            >
              { `${order.delivery_address} - ${order.delivery_number}` }
            </p>
            <p
              data-testid={ `seller_orders__element-delivery-status-${order.id}` }
            >
              { order.status }
            </p>
            <p
              data-testid={ `seller_orders__element-order-date-${order.id}` }
            >
              { order.sale_date }
            </p>

          </div>
        ))
      }
    </div>
  );
}

export default OrderSeller;
