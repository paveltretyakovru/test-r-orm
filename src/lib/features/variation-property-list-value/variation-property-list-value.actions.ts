/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createAction } from '@reduxjs/toolkit';
import { VariationPropertyListValuesResponse } from './variation-property-list-value.types';

export enum variationPropertyListValueAction {
  upsert = 'variationPropertyListValue/upsert',
}

export const upsertVariationPropertyListValues =
  createAction<VariationPropertyListValuesResponse>(
    variationPropertyListValueAction.upsert,
  );
