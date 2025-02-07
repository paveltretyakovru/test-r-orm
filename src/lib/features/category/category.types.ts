/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { SessionBoundModel } from 'redux-orm';
import Category from './category.model';

export type CategoryModels = SessionBoundModel<Category, {}>[];

export interface CategorySchema {
  id: number;
  name: string;
  parentId: number;
  childCategories?: CategorySchema[];
}

export interface CategoryResponse {
  id: number;
  name: string;
  parent_id: number;
}

export type CategoriesResponse = CategoryResponse[];
