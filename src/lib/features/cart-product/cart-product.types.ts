/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { SessionBoundModel } from 'redux-orm';
import { VariationModel, VariationSchema } from '../variation/variation.types';
import { CartProduct } from './cart-product.model';

export interface CartProductSchema {
  id: number;
  count: number;
  variationId: VariationSchema['id'];

  // Referal fields
  variation?: VariationModel;
}

export interface UpsertCartProductPayload {
  id?: number;
  count?: number;
  variationId: VariationSchema['id'];
}

export type CartProductModel = SessionBoundModel<
  CartProduct,
  CartProductSchema
>;
export type CartProductModels = CartProductModel[];

export function isUpsertCartProductPayload(
  payload: unknown,
): payload is UpsertCartProductPayload {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  const data = payload as UpsertCartProductPayload;

  return (
    typeof data.id === 'number' ||
    (typeof data.id === 'undefined' && typeof data.count === 'string') ||
    (typeof data.count === 'undefined' && typeof data.variationId === 'number')
  );
}
