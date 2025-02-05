/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';

export const selectVariations = createSelector(orm, (session) =>
  session.Variation.all().toRefArray(),
);
