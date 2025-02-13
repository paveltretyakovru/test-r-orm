/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createAction } from '@reduxjs/toolkit';
import { VariationSchema } from '../variation/variation.types';

export enum orderActionType {
  addVariationToCart = 'order/addVariationToCart',
  decrementVariationFromCart = 'order/decrementVariationFromCart',
}
