/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { Categories } from './components/categories';
import { ProductsList } from './components/products-list/products-list';

export function Home() {
  return (
    <div>
      <Categories />
      <ProductsList />
    </div>
  );
}

Home.route = '/';
