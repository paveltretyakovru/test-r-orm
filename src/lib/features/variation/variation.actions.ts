/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { createAction } from '@reduxjs/toolkit';
import { VariationsResponse } from './variation.types';

export enum variationActionType {
  upsert = 'product-variation/set',
}

export const upsertVariations = createAction<VariationsResponse>(
  variationActionType.upsert,
);
