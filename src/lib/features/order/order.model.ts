/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import Model, { attr, FieldSpecMap, many, ModelType } from 'redux-orm';
import { OrmSession } from 'redux-orm/Session';
import { orderActionType } from './order.actions';
import { CreateOrderPayload, OrderStatus } from './order.types';
import { VariationSchema } from '../variation/variation.types';

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
    session: OrmSession<any>,
  ): void {
    switch (type) {
      case orderActionType.create: {
        // Вычисляем идентификатор последнего заказа
        let id = 1;
        const orders = [...model.all().toRefArray()];

        if (orders.length) {
          orders.sort((a, b) => a.id - b.id);
          id = orders[orders.length - 1].id + 1;
        }

        const { address, name, deliveryDate, phone } =
          payload as CreateOrderPayload;

        const counts: { count: number; variationId: VariationSchema['id'] }[] =
          [];
        const variationsIds: VariationSchema['id'][] = [];

        session.CartProduct.all()
          .toModelArray()
          .forEach((product) => {
            variationsIds.push(product.variationId);
            counts.push({
              count: product.count,
              variationId: product.variationId,
            });
          });

        model.create({
          id,
          name,
          address,
          deliveryDate,

          counts,
          variationsIds,

          status: OrderStatus.completed,
          createdAt: new Date().getTime(),
          phoneNumber: phone,
        });

        break;
      }
    }
  }
}
