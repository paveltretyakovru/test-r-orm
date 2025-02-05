/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { createAction } from '@reduxjs/toolkit';
import { ProductsResponse } from './product.types';

export enum productActionType {
  upsert = 'product/upsert',
}

export const upsertProducts = createAction<ProductsResponse>(
  productActionType.upsert,
);
