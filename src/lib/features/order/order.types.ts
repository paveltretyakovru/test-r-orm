/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { QuerySet, SessionBoundModel } from 'redux-orm';
import { VariationModels, VariationSchema } from '../variation/variation.types';
import { Order } from './order.model';

export enum OrderStatus {
  cart, // — товары добавлены в корзину, но заказ еще не оформлен.
  pending, // — заказ оформлен, но еще не обработан (например, ожидает оплаты или подтверждения).
  processing, // — заказ в процессе обработки (например, собирается или готовится к отправке).
  completed, // — заказ завершен (товары доставлены или получены).
  cancelled, // — заказ отменен.
}

export interface OrderSchema {
  // State
  id: number;
  status: OrderStatus;
  variationsIds: VariationSchema['id'][];
  counts: {
    count: number;
    variationId: VariationSchema['id'];
  }[];

  // Delivery information
  name: string;
  address: string;
  phoneNumber: string;
  deliveryDate: number | null;

  // System attrs
  createdAt: number | null;

  // Related fields
  variations: QuerySet<Order, OrderSchema>;
}

export type OrderModel = SessionBoundModel<Order, OrderSchema>;
export type OrderModels = SessionBoundModel<Order, OrderSchema>[];
