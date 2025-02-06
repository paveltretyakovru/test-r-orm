/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';

export const selectVariationProperties = createSelector(orm, (session) =>
  session.VariationProperty.all().toModelArray(),
);
