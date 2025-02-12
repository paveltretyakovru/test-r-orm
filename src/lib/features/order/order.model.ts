/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import Model, {
  attr,
  FieldSpecMap,
  many,
  ModelType,
  QuerySet,
  SessionBoundModel,
} from 'redux-orm';
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
    name: attr(),
    address: attr(),
    deliveryDate: attr(),
    phoneNumber: attr(),

    createdAt: attr(),
  };

  static reducer(
    { type, payload }: PayloadAction<unknown>,
    model: ModelType<Order>,
  ): void {
    switch (type) {
      case orderActionType.addVariationToCart: {
        let cart: SessionBoundModel<Order, {}>;
        const findCart = model
          .all()
          .toModelArray()
          .find((m) => m.status === OrderStatus.cart);

        if (!findCart) {
          cart = model.create({
            id: 1,
            status: OrderStatus.cart,
            address: '',
            createdAt: null,
            deliveryDate: null,
            name: '',
            phoneNumber: '',
            variationsIds: [],
          });
        } else {
          cart = findCart as OrderModel;
        }

        cart.update({
          ...cart.ref,
          variationsIds: [...cart.ref.variationsIds, payload],
        });

        break;
      }
    }
  }
}
