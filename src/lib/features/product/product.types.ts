/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { QuerySet, SessionBoundModel } from 'redux-orm';
import { VariationModels, VariationSchema } from '../variation/variation.types';
import Product from './product.model';
import Variation from '../variation/variation.model';
import Image from '../image/image.model';
import { ImageSchema } from '../image/image.types';

export type ProductModel = SessionBoundModel<Product, ProductSchema>;
export type ProductModels = SessionBoundModel<Product, ProductSchema>[];

export interface ProductSchema {
  id: number;
  name: string;
  categoryId: number;
  description: string;

  // Related fields
  images: QuerySet<Image, ImageSchema>;
  variations: QuerySet<Variation, VariationSchema>;
}

export interface ProductResponse {
  id: number;
  category_id: number;
  description: string;
  name: string;
}

export type ProductsResponse = ProductResponse[];
