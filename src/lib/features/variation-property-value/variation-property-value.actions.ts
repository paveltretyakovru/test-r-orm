/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createAction } from '@reduxjs/toolkit';
import { VariationPropertyValueResponses } from './variation-property-value.types';

export enum VariationPropertyValueActionType {
  upsert = 'models/propertyVariationValue',
}

export const upsertVariationPropertyValuesAction =
  createAction<VariationPropertyValueResponses>(
    VariationPropertyValueActionType.upsert,
  );
