/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createAction } from '@reduxjs/toolkit';
import { VariationPropertiesResponse } from './variation-property.types';

export enum variationPropertyActions {
  upsert = 'variatonProperty/upsert',
}

export const upsertVariationProperties =
  createAction<VariationPropertiesResponse>(variationPropertyActions.upsert);
