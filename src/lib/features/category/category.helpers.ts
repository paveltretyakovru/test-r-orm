/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { SessionBoundModel } from 'redux-orm';
import Category from './category.model';
import { CategorySchema } from './category.types';

export function collectCategoriesTree(
  categories: readonly SessionBoundModel<Category, {}>[],
  rootNodeId: CategorySchema['id'],
): SessionBoundModel<Category, {}>[] {
  const root = categories.find((category) => category.getId() === rootNodeId);

  if (root) {
    const childrenCategories: SessionBoundModel<Category, {}>[] = [root];

    function recursion(
      node: SessionBoundModel<Category, {}>,
      arr: SessionBoundModel<Category, {}>[],
    ) {
      const rootId = node.ref.id;

      categories
        .filter((category) => category.ref.parentId === rootId)
        .forEach((childrenCategory) => {
          arr.push(childrenCategory);
          recursion(childrenCategory, arr);
        });
    }

    recursion(root, childrenCategories);

    return childrenCategories;
  }

  console.error(`Не найдена категория с id=${rootNodeId}`);
  return [];
}
