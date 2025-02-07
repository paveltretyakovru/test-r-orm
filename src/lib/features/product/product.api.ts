/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { ErrorResponse } from 'react-router';
import api from '../../api.service';
import { ProductResponse, ProductsResponse } from './product.types';
import { CategoryModels, CategorySchema } from '../category/category.types';
import { toast } from 'react-toastify';

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

export const getProductsOfCategories = async (
  categoriesIds: CategorySchema['id'][],
): Promise<ProductsResponse> => {
  const products: ProductsResponse = [];

  try {
    const response = await api.get<ProductsResponse>(
      `/api/Products?sort=["name","ASC"]&filter={${categoriesIds.join(',')}}`,
    );

    products.push(...response);
  } catch (e) {
    if (e instanceof Error) {
      toast.error(
        `Произошла ошибка во время загрузки изображений: ${e.message}`,
      );
    }
  }

  return products;
};
