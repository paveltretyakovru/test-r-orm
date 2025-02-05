/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { ImageSchema } from '../image/image.types';
import { VariationSchema } from '../variation/variation.types';

export interface ProductSchema {
  id: number;
  name: string;
  categoryId: number;
  description: string;

  images: any;
  variation: VariationSchema;
}

export interface ProductResponse {
  id: number;
  category_id: number;
  description: string;
  name: string;
}

export type ProductsResponse = ProductResponse[];
