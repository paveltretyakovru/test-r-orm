/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createAction } from '@reduxjs/toolkit';
import { VariationSchema } from '../variation/variation.types';

export enum orderActionType {
  addVariationToCart = 'order/addVariationToCart',
  removeVariationFromCart = 'order/removeVariationFromCart',
}

export const addVariationToCart = createAction<VariationSchema['id']>(
  orderActionType.addVariationToCart,
);

export const removeVariationFromCart = createAction<VariationSchema['id']>(
  orderActionType.removeVariationFromCart,
);
