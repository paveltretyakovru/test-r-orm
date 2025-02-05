/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import api from '../../api.service';
import { ProductSchema } from '../product/product.types';
import { VariationsResponse } from './variation.types';

export const getVariations = (): Promise<VariationsResponse> =>
  api.get<VariationsResponse>('/api/ProductVariations?range=[0,1000]');

export const getVariationsByProductId = (
  productsIds: ProductSchema['id'][],
): Promise<VariationsResponse> => {
  let filters = 'filter={"product_id":[';

  productsIds.forEach(
    (productId, index) =>
      (index !== productsIds.length - 1 && (filters += `${productId},`)) ||
      (filters += `${productId}`),
  );
  filters += ']}';

  return api.get<VariationsResponse>(
    `/api/ProductVariations?range=[0,1000]&${filters}`,
  );
};
