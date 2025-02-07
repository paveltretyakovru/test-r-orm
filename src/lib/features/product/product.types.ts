/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { QuerySet, SessionBoundModel } from 'redux-orm';
import { VariationModels, VariationSchema } from '../variation/variation.types';
import Product from './product.model';
import Variation from '../variation/variation.model';

export type ProductModel = SessionBoundModel<Product, ProductSchema>;
export type ProductModels = SessionBoundModel<Product, ProductSchema>[];

export interface ProductSchema {
  id: number;
  name: string;
  categoryId: number;
  description: string;

  images: any;
  variations: QuerySet<Variation>;
}

export interface ProductResponse {
  id: number;
  category_id: number;
  description: string;
  name: string;
}

export type ProductsResponse = ProductResponse[];
