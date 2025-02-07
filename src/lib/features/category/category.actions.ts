/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createAction } from '@reduxjs/toolkit';
import { CategoriesResponse, CategorySchema } from './category.types';

export enum categoryActionType {
  'set' = 'category/set',
}

export const setCategories = createAction<CategoriesResponse>(
  categoryActionType.set,
);
