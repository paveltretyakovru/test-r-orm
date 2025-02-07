/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createSelector } from 'redux-orm';
import { orm } from '../../orm';
import { CategorySchema } from './category.types';
import { collectCategoriesTree } from './category.helpers';

export const selectCategories = createSelector(orm, (session) =>
  session.Category.all().toModelArray(),
);

export const selectActiveCategories = (
  rootCategoryId: CategorySchema['id'],
) => {
  return createSelector(orm, (session) =>
    collectCategoriesTree(
      session.Category.all().toModelArray(),
      rootCategoryId,
    ),
  );
};
