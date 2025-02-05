/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { ProductSchema } from '../product/product.types';

export interface ImageSchema {
  id: number;
  imageName: number;
  imageUrl: string;
  productId: number;
  product: ProductSchema;
}

export interface ImageResponse {
  id: number;
  image_url: string;
  image_name: string;
  product_id: number;
}

export type ImagesResponse = ImageResponse[];
