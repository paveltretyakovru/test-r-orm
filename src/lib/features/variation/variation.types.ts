/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { SessionBoundModel } from 'redux-orm';
import Variation from './variation.model';

export type VariationModel = SessionBoundModel<Variation, VariationSchema>;
export type VariationModels = SessionBoundModel<Variation, VariationSchema>[];

export interface VariationSchema {
  id: number;
  price: number;
  stock: number;
  productId: number;
}

export interface VariationResponse {
  id: number;
  price: number;
  stock: number;
  product_id: number;
}

export type VariationsResponse = VariationResponse[];
