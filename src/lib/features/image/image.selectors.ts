/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';

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
