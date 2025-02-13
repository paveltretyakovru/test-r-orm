/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import Model, {
  attr,
  FieldSpecMap,
  ModelType,
  oneToOne,
  Session,
} from 'redux-orm';
import { CartProductActionType } from './cart-product.actions';
import {
  CartProductModels,
  CartProductSchema,
  isUpsertCartProductPayload,
  UpsertCartProductPayload,
} from './cart-product.types';

export class CartProduct extends Model {
  static modelName: string = 'CartProduct';

  static fields: FieldSpecMap = {
    id: attr(),
    count: attr(),
    variationId: oneToOne({
      to: 'Variation',
      as: 'variation',
      relatedName: 'cartProduct',
    }),

    // ==== related ====
    // variation - VariationModel
  };

  static reducer(
    { type, payload }: PayloadAction<unknown>,
    model: ModelType<CartProduct>,
  ): void {
    switch (type) {
      case CartProductActionType.upsert: {
        console.log('UPSERT', payload);

        if (isUpsertCartProductPayload(payload)) {
          model.upsert({
            ...(payload as CartProductSchema),
            count: 1,
          });
        } else {
          console.error(
            'При создании товара в корзине передан неправильный payload',
          );
        }

        break;
      }

      case CartProductActionType.increment: {
        const variationId = payload;

        const cartProduct = (
          model.all().toModelArray() as CartProductModels
        ).find((m) => m.variation?.id === variationId);

        if (cartProduct) {
          cartProduct.update({
            ...cartProduct.ref,
            count: cartProduct.count + 1,
          });
        } else {
          console.error('Ненайдена модель товара в корзине');
        }

        break;
      }

      case CartProductActionType.decrement: {
        const variationId = payload;

        const cartProduct = (
          model.all().toModelArray() as CartProductModels
        ).find((m) => m.variation?.id === variationId);

        if (cartProduct) {
          cartProduct.update({
            ...cartProduct.ref,
            count: cartProduct.count - 1 || 1,
          });
        } else {
          console.error('Ненайдена модель товара в корзине');
        }

        break;
      }
    }
  }
}
