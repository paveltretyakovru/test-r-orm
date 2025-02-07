/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { toast } from 'react-toastify';
import api from '../../api.service';
import { ProductModels, ProductSchema } from '../product/product.types';
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

export async function fetchProductsImages(
  productsIds: ProductSchema['id'][],
): Promise<ImagesResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const ids = productsIds.join(',');

      const response = await api.get<ImagesResponse>(
        `/api/ProductImages?filter={"product_id":[${ids}]}&range=[0,1000]`,
      );

      resolve(response);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(
          `Ошибка во время загрузки изображений продуктов. ${e.message}`,
        );
        console.error(
          `Ошибка во время загрузки изображений продуктов. ${e.message}`,
          e,
        );
      } else {
        toast.error(`Ошибка во время загрузки изображений продуктов`);
        console.error(`Ошибка во время загрузки изображений продуктов`, e);
      }

      reject([]);
    }
  });
}
