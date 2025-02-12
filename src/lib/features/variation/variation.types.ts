/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { QuerySet, SessionBoundModel } from 'redux-orm';
import Variation from './variation.model';
import { VariationPropertyValue } from '../variation-property-value/variation-property-value.model';
import { VariationPropertyValueSchema } from '../variation-property-value/variation-property-value.types';
import { ProductModel } from '../product/product.types';

export type VariationModel = SessionBoundModel<Variation, VariationSchema>;
export type VariationModels = SessionBoundModel<Variation, VariationSchema>[];

export interface VariationSchema {
  id: number;
  price: number;
  stock: number;
  productId: number;

  // Related fields
  values: QuerySet<VariationPropertyValue, VariationPropertyValueSchema>;
  product: ProductModel;
}

export interface VariationResponse {
  id: number;
  price: number;
  stock: number;
  product_id: number;
}

export type VariationsResponse = VariationResponse[];
