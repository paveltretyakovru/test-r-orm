/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { upsertImages } from '../../../../lib/features/image/image.actions';
import { upsertProducts } from '../../../../lib/features/product/product.actions';
import { selectCategories } from '../../../../lib/features/category/category.selectors';
import { fetchProductsImages } from '../../../../lib/features/image/image.api';
import { selectActiveCategory } from '../../../app.selectors';
import { collectCategoriesTree } from '../../../../lib/features/category/category.helpers';
import { getProductsOfCategories } from '../../../../lib/features/product/product.api';
import { selectProdcutByCategories } from '../../../../lib/features/product/product.selectors';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';

export const useProductList = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const categories = useSelector(selectCategories);
  const activeCategory = useAppSelector(selectActiveCategory);

  const activeCategories = useMemo(
    () => collectCategoriesTree(categories, activeCategory),
    [categories, activeCategory],
  );

  const products = useSelector(selectProdcutByCategories(activeCategories));

  // Отслеживание изменений категории товаров
  useEffect(() => {
    setLoading(true);

    if (activeCategories.length) {
      // Загружаем товары активной категории
      getProductsOfCategories(activeCategories.map((ac) => ac.id))
        .then(
          (responseProducts) =>
            dispatch(upsertProducts(responseProducts)) && responseProducts,
        )
        // Загружаем изображения полученых товаров
        .then(async (responseProducts) => {
          const responseImages = await fetchProductsImages(
            responseProducts.map((p) => p.id),
          );
          dispatch(upsertImages(responseImages));
        })
        .finally(() => setLoading(false));
    }
  }, [activeCategories]);

  return { loading, products };
};
