/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { orm } from '../../orm';
import { createSelector } from 'redux-orm';
import { VariationSchema } from '../variation/variation.types';
import { VariationPropertyValue } from './variation-property-value.model';
import { VariationPropertyValueModels } from './variation-property-value.types';

export const selectPropertyValuesByVariationId = (
  id: VariationSchema['id'] | null,
) =>
  createSelector(orm, (session) =>
    (
      VariationPropertyValue.all().toModelArray() as VariationPropertyValueModels
    ).filter((vpv) => vpv.variationId),
  );
