/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { orm } from '../../orm';
import { createSelector } from 'redux-orm';
import { OrderModel, OrderStatus } from './order.types';

export const selectCartOrder = createSelector(
  orm,
  (session) =>
    (session.Order.all()
      .toModelArray()
      .find(
        (m) => (m as OrderModel).status === OrderStatus.cart,
      ) as OrderModel) || null,
);
