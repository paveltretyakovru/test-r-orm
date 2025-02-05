/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import api from '../../api.service';
import { CategoriesResponse } from './category.types';

export const getCategories = (): Promise<CategoriesResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(api.get<CategoriesResponse>('/api/Categories'));
    }, 300);
  });
