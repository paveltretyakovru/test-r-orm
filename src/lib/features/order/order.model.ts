/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Model, {
  attr,
  FieldSpecMap,
  many,
  ModelType,
  SessionBoundModel,
} from 'redux-orm';
import { VariationSchema } from '../variation/variation.types';
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
      case orderActionType.addVariationToCart: {
        const newId = payload as VariationSchema['id'];

        let cart: SessionBoundModel<Order, OrderSchema>;
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
            counts: [],
          }) as unknown as OrderModel;
        } else {
          cart = findCart as OrderModel;
        }

        // Если продукт ранее был занесён, обновляем счётчик
        if (cart.variationsIds.some((v) => v === newId)) {
          cart.update({
            counts: cart.counts.map((v) => ({
              count: v.count + 1,
              variationId: v.variationId,
            })),
          });
        } else {
          // Иначе добавляем новую запись
          cart.update({
            variationsIds: [...cart.variationsIds, newId],
            counts: [
              ...cart.counts,
              {
                count: 1,
                variationId: newId,
              },
            ],
          });
        }

        toast.success('Заказ добавлен в корзину', {
          position: 'bottom-right',
          autoClose: 1000,
        });

        break;
      }
    }
  }
}
