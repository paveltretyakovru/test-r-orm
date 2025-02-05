/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  attr,
  Model,
  oneToOne,
  SessionBoundModel,
  type ModelType,
  type Session,
} from 'redux-orm';
import { Schema } from '../../orm';
import { categoryActionType } from './category.actions';
import type { CategoriesResponse } from './category.types';
import { collectCategoriesTree } from './category.helpers';

class Category extends Model {
  static modelName = 'Category';

  static fields = {
    id: attr(),
    name: attr(),
    childCategories: attr(),

    parentId: oneToOne({
      to: 'Category',
      as: 'parent',
    }),
  };

  static reducer(
    action: PayloadAction<CategoriesResponse>,
    Category: ModelType<Category>,
    session: Session<Schema>,
  ): void {
    if (action.type === categoryActionType.set) {
      const newCategories: SessionBoundModel<Category, {}>[] = [];

      action.payload.forEach((category) => {
        const { parent_id: parentId, ...clear } = category;

        newCategories.push(
          Category.upsert({
            ...clear,
            parentId,
          }),
        );
      });

      newCategories.forEach((category) => {
        category.set(
          'childCategories',
          collectCategoriesTree(
            Category.all().toModelArray(),
            category.getId(),
          ).map((child) => child.ref),
        );
      });
    }
  }
}

export default Category;
