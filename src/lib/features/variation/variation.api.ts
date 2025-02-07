/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import api from '../../api.service';
import { ProductSchema } from '../product/product.types';
import { VariationsResponse } from './variation.types';

export const getVariations = (): Promise<VariationsResponse> =>
  api.get<VariationsResponse>('/api/ProductVariations?range=[0,1000]');

export const fetchVariationsByProductIds = (
  ids: ProductSchema['id'][],
): Promise<VariationsResponse> =>
  api.get<VariationsResponse>(
    `/api/ProductVariations?range=[0,1000]&filter={"product_id":[${ids.join(',')}]}`,
  );
