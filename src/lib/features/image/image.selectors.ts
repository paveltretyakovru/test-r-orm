/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';
import { ProductModels } from '../product/product.types';
import { ImageModels } from './image.types';

export const selectImages = createSelector(orm, (session) =>
  session.Image.all().toModelArray(),
);

export const selectImageByProductId = (id: number) => {
  return createSelector(orm, (session) => {
    const { Image, Product } = session;
    const product = Product.withId(id);

    return Image.all()
      .toRefArray()
      .filter((ref) => ref.productId === id)
      .map((ref) => {
        return {
          ...ref,
          product,
        };
      });
  });
};
