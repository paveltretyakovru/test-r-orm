/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Model, { attr, FieldSpecMap, many, ModelType } from 'redux-orm';
import {
  VariationModel,
  VariationModels,
  VariationSchema,
} from '../variation/variation.types';
import { orderActionType } from './order.actions';
import { OrderModel, OrderSchema, OrderStatus } from './order.types';

export class Order extends Model {
  static modelName: string = 'Order';

  static fields: FieldSpecMap = {
    status: attr(),
    variationsIds: many({
      to: 'Variation',
      as: 'variations',
    }),

    name: attr({
      getDefault() {
        return '';
      },
    }),

    counts: attr({
      getDefault() {
        return [];
      },
    }),

    address: attr({
      getDefault() {
        return '';
      },
    }),

    deliveryDate: attr(),
    phoneNumber: attr(),

    createdAt: attr(),
  };

  static reducer(
    { type, payload }: PayloadAction<unknown>,
    model: ModelType<Order>,
  ): void {
    switch (type) {
    }
  }
}
