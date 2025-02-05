/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';
import { VariationSchema } from './variation.types';

export const selectVariations = createSelector(orm, (session) =>
  session.Variation.all().toRefArray(),
);

export const selectVariationById = (id: VariationSchema['id'] | null) =>
  createSelector(orm, (session) => session.Variation.withId(id));
