/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';

export const selectCartProducts = createSelector(orm, (session) =>
  session.CartProduct.all().toModelArray(),
);
