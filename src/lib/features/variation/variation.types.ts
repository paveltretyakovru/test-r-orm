/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
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
