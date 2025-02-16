/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createAction } from '@reduxjs/toolkit';
import { CreateOrderPayload } from './order.types';

export enum orderActionType {
  create = 'order/create',
  addVariationToCart = 'order/addVariationToCart',
  decrementVariationFromCart = 'order/decrementVariationFromCart',
}

export const createOrderAction = createAction<CreateOrderPayload>(
  orderActionType.create,
);
