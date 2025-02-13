/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createAction } from '@reduxjs/toolkit';
import {
  CartProductModel,
  CartProductSchema,
  UpsertCartProductPayload,
} from './cart-product.types';

export enum CartProductActionType {
  upsert = 'cartProduct/upsert',
  delete = 'cartProduct/delete',
  increment = 'cartProduct/increment',
  decrement = 'cartProduct/decrement',
}

export const upsertCartProduct = createAction<UpsertCartProductPayload>(
  CartProductActionType.upsert,
);

export const incrementCartProduct = createAction<CartProductSchema['id']>(
  CartProductActionType.increment,
);

export const decrementCartProduct = createAction<CartProductSchema['id']>(
  CartProductActionType.decrement,
);

export const deleteCartProduct = createAction<CartProductSchema['id']>(
  CartProductActionType.delete,
);
