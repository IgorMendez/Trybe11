import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './login';
import Products from './products';
import Details from './details';
import Orders from './orders';
import Register from './register';
import ClientCheckout from './clientCheckout';
import AdminManage from './adminManage';
import OrderSeller from './sellerOrders';
import SellerDetails from './sellerDetails';

export default function index() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/customer/orders/:id" element={ <Details /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/orders" element={ <Orders /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/checkout" element={ <ClientCheckout /> } />
      <Route path="/admin/manage" element={ <AdminManage /> } />
      <Route path="/seller/orders" element={ <OrderSeller /> } />
      <Route
        path="/seller/orders/:id"
        element={ <SellerDetails /> }
        props={ (props) => props }
      />
    </Routes>
  );
}
