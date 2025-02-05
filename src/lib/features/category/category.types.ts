/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

export interface CategoryInterface {
  id: number;
  name: string;
  parentId: number;
  childCategories?: CategoryInterface[];
}

export interface CategoryResponse {
  id: number;
  name: string;
  parent_id: number;
}

export type CategoriesResponse = CategoryResponse[];
