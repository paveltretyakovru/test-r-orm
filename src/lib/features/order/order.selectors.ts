/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';
import { OrderModel, OrderModels, OrderSchema } from './order.types';

export const selectOrders = createSelector(
  orm,
  (session) => session.Order.all().toModelArray() as OrderModels,
);

export const selectOrder = (orderId: OrderSchema['id']) =>
  createSelector(
    orm,
    (session) =>
      (session.Order.all()
        .toModelArray()
        .find((o) => o.getId() === orderId) as OrderModel | undefined) || null,
  );
