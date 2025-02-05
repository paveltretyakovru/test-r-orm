/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import { attr, fk, Model, ModelType, oneToOne } from 'redux-orm';
import { variationActionType } from './variation.actions';
import { VariationsResponse } from './variation.types';

class Variation extends Model {
  static modelName = 'Variation';

  static fields = {
    id: attr(),
    price: attr(),
    stock: attr(),

    productId: fk({
      to: 'Product', // К какой модели идёт обращение
      as: 'product', // Отображаемое имя поля в этой модели
      relatedName: 'variations', // Отображаемое имя в связанной модели
    }),
  };

  static reducer(
    { type, payload }: PayloadAction<VariationsResponse>,
    Variation: ModelType<Variation>,
  ) {
    switch (type) {
      case variationActionType.upsert: {
        const variations = payload;

        if (!variations.length) {
          console.warn('Unable to create products');
        } else {
          variations.forEach((responseVariation) => {
            const { product_id: productId, ...clear } = responseVariation;

            Variation.upsert({
              ...clear,
              productId,
            });
          });
        }
        break;
      }
      default:
        break;
    }
  }
}

export default Variation;
