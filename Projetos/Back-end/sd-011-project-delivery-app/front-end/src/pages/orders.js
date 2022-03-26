import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';
import StoreDelivery from '../context/context';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const context = useContext(StoreDelivery);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

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
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    context.orders = orders;
  }, [orders, context.orders]);

  const getOneSale = async ({ id }) => {
    const { userId } = JSON.parse(localStorage.getItem('user'));

    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    myHeaders.append('Authorization', userId);
    myHeaders.append('Content-Type', 'application/json');
    return fetch(`http://localhost:3001/orders/${id}`, requestOptions)
      .then((result) => result.json())
      .then((e) => {
        context.order = e;
      })
      .then(() => navigate(`/customer/orders/${id}`))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Header />
      {
        orders.map((order, index) => {
          const date = moment(order.createdAt).format('DD/MM/YYYY');
          return (
            <div
              key={ index }
              onClick={ () => getOneSale(order) }
              onKeyDown={ () => console.log('oi') }
              role="button"
              tabIndex={ 0 }
            >
              <div
                data-testid={ `customer_orders__element-order-id-${order.id}` }
              >
                {order.id}
              </div>
              <div
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
              >
                {order.status}
              </div>
              <div
                data-testid={ `customer_orders__element-order-date-${order.id}` }
              >
                {date}
              </div>
              <div
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                {Number(order.total_price).toFixed(2).replace(/\./, ',')}

              </div>
            </div>
          );
        })
      }
    </div>
  );
}
