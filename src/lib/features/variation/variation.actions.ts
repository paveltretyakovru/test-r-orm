/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { createAction } from '@reduxjs/toolkit';
import { VariationsResponse } from './variation.types';

export enum variationActionType {
  'set' = 'product-variation/set',
}

export const setVariations = createAction<VariationsResponse>(
  variationActionType.set,
);
