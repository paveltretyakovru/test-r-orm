/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';
import { VariationModels, VariationSchema } from './variation.types';
import { ProductSchema } from '../product/product.types';

export const selectVariations = createSelector(orm, (session) =>
  session.Variation.all().toRefArray(),
);

export const selectVariationById = (id: VariationSchema['id'] | null) =>
  createSelector(orm, (session) => session.Variation.withId(id));

export const selectVariationsByProductId = (productId: ProductSchema['id']) => {
  return createSelector(
    orm,
    (session) =>
      (
        session.Variation.all().toModelArray() as VariationModels | null
      )?.filter((v) => v.productId === productId) || null,
  );
};
