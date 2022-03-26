import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <nav>
      {user.role === 'customer' && (
        <Link
          to="/customer/products"
        >
          <span
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </span>
        </Link>
      )}
      <Link to={ `/${user.role}/orders` }>
        <span
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </span>
      </Link>
      <span
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {user.name}
      </span>
      <Link
        to="/"
        onClick={ () => {
          localStorage.removeItem('user');
          localStorage.removeItem('cart');
        } }
      >
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
        >
          sair
        </button>
      </Link>
    </nav>
  );
}
