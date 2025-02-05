/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { ErrorResponse } from 'react-router';
import api from '../../api.service';
import { ProductResponse, ProductsResponse } from './product.types';
import { CategoryInterface } from '../category/category.types';

export const getProducts = (): Promise<ProductsResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(api.get<ProductsResponse>('/api/Products?sort=["name","ASC"]'));
    }, 300);
  });

export const getProductById = (id: number): Promise<ProductResponse> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await api.get<Response>(`/api/Products/${id}`, true);

      if (!response.ok) {
        if (response.status === 404) {
          reject({
            status: response.status,
            statusText: 'Товар не найден',
          } as ErrorResponse);
        } else {
          reject({
            status: response.status,
            statusText: 'Произошла ошибка при обработке товара',
          } as ErrorResponse);
        }
      }

      const product = await response.json();
      resolve(product);
    } catch (e) {
      if (e instanceof Error) {
        reject({
          statusText: e.message,
        } as ErrorResponse);
      }
    }
  });

export const getProductsOfCategory = (
  categoriesIds: CategoryInterface['id'][],
): Promise<ProductsResponse> => {
  let filters = '&filter={"category_id":[';
  categoriesIds.forEach(
    (categoryId, index) =>
      (index !== categoriesIds.length - 1 && (filters += `${categoryId},`)) ||
      (filters += `${categoryId}`),
  );
  filters += ']}';

  return api.get<ProductsResponse>(
    `/api/Products?sort=["name","ASC"]${filters}`,
    // `/api/Products?sort=["name","ASC"]&range=[0,19]&filter={"category_id":${categoryId}}`,
  );
};
