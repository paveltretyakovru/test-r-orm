/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';
import { ProductResponse, ProductSchema } from './product.types';

export const selectProduct = (id: number) => {
  return createSelector(orm, (session) => {
    return session.Product.withId(id);
  });
};

export const selectProducts = createSelector(orm, (session) =>
  session.Product.all().toModelArray(),
);

export const selectCategoryProduct = (
  categoryId: ProductResponse['category_id'],
) => {};
