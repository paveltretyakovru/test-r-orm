/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import api from '../../api.service';
import { ProductSchema } from '../product/product.types';
import { ImagesResponse } from './image.types';

export const getProductsImages = (
  productsIds: ProductSchema['id'][],
): Promise<ImagesResponse> => {
  let filters = 'filter={"product_id":[';
  productsIds.forEach(
    (productId, index) =>
      (index !== productsIds.length - 1 && (filters += `${productId},`)) ||
      (filters += `${productId}`),
  );
  filters += ']}';

  return new Promise(async (resolve, reject) => {
    const response = await api.get<ImagesResponse>(
      `/api/ProductImages?${filters}&range=[0,1000]`,
    );

    resolve(response);
  });
};

export const getImagesByProductId = (
  productId: number,
): Promise<ImagesResponse> =>
  new Promise(async (resolve, reject) => {
    const response = await api.get<ImagesResponse>(
      `/api/ProductImages?filter={"product_id":${productId}}`,
    );

    resolve(response);
  });
