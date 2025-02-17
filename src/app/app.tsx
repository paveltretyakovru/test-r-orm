/*
 *   Copyright (c) 2025
 *   All rights reserved.
 */

import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './components/layout';
import { Home } from './home/home.page';
import { Cart } from './cart/cart.page';
import { Product } from './product/product.page';
import { NotFound } from './not-found.page';
import { Checkout } from './checkout/checkout.page';
import { Orders } from './orders/orders.page';
import { Order } from './orders/order/order.page';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Products list */}
        <Route path={Home.route} element={<Home />} />

        {/* Cart */}
        <Route path={Cart.route} element={<Cart />} />

        {/* Product routes */}
        <Route path={Product.route} element={<Product />} />
        <Route path={Product.variationRoute} element={<Product />} />

        {/* Checkout */}
        <Route path={Checkout.route} element={<Checkout />} />

        {/* Orders */}
        <Route path={Orders.route} element={<Orders />} />
        <Route path={Order.route} element={<Order />} />

        {/* System routes */}
        <Route path={NotFound.route} element={<NotFound />} />
        <Route path="*" element={<Navigate to={NotFound.route} replace />} />
      </Route>
    </Routes>
  );
};

export default App;
