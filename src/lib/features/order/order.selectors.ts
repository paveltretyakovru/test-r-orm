/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';

export const selectOrders = createSelector(orm, (session) =>
  session.Order.all().toModelArray(),
);
