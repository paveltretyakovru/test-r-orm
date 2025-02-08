/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';
import {
  ProductModel,
  ProductModels,
  ProductResponse,
  ProductSchema,
} from './product.types';
import { CategoryModels } from '../category/category.types';

export const selectProduct = (id: number) => {
  return createSelector(orm, (session) => {
    return session.Product.withId(id) as ProductModel | null;
  });
};

export const selectProdcutByCategories = (activeCategories: CategoryModels) => {
  return createSelector(orm, (session) => {
    const products: ProductModels = [];

    activeCategories.forEach((category) => {
      const findProducts = (
        session.Product.all().toModelArray() as ProductModels
      ).filter((p) => p.categoryId === category.id);

      if (findProducts) {
        products.push(...findProducts);
      }
    });

    return products;
  });
};
