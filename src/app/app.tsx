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

        {/* System routes */}
        <Route path={NotFound.route} element={<NotFound />} />
        <Route path="*" element={<Navigate to={NotFound.route} replace />} />
      </Route>
    </Routes>
  );
};

export default App;
