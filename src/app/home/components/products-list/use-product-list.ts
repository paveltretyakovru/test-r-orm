/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { collectCategoriesTree } from '../../../../lib/features/category/category.helpers';
import { selectCategories } from '../../../../lib/features/category/category.selectors';
import { upsertImages } from '../../../../lib/features/image/image.actions';
import { fetchProductsImages } from '../../../../lib/features/image/image.api';
import { upsertProducts } from '../../../../lib/features/product/product.actions';
import { getProductsOfCategoriesPerPage } from '../../../../lib/features/product/product.api';
import { selectProdcutByCategories } from '../../../../lib/features/product/product.selectors';
import { upsertVariations } from '../../../../lib/features/variation/variation.actions';
import { fetchVariationsByProductIds } from '../../../../lib/features/variation/variation.api';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { selectActiveCategory } from '../../../app.selectors';

export const useProductList = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [finished, setFinished] = useState<boolean>(false);

  const categories = useSelector(selectCategories);
  const activeCategory = useAppSelector(selectActiveCategory);

  const activeCategories = useMemo(
    () => collectCategoriesTree(categories, activeCategory),
    [categories, activeCategory],
  );

  const products = useSelector(selectProdcutByCategories(activeCategories));

  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  // Отслеживание изменений категории товаров
  useEffect(() => {
    setLoading(true);

    if (activeCategories.length) {
      // Загружаем товары активной категории
      getProductsOfCategoriesPerPage(
        activeCategories.map((ac) => ac.id),
        10,
        page,
      )
        .then((products) => dispatch(upsertProducts(products)) && products)
        .then(
          (products) =>
            (!products.length && setFinished(true) && products) || products,
        )
        // Загружаем вариации товаров
        .then(
          async (products) =>
            dispatch(
              upsertVariations(
                await fetchVariationsByProductIds(products.map((p) => p.id)),
              ),
            ) && products,
        )
        // Загружаем изображения полученых товаров
        .then(async (products) =>
          dispatch(
            upsertImages(await fetchProductsImages(products.map((p) => p.id))),
          ),
        )
        .finally(() => setLoading(false));
    }
  }, [activeCategories, page]);

  useEffect(() => {
    console.log('Active categories updated');
    setPage(1);
    setFinished(false);
  }, [activeCategories]);

  return { loading, products, nextPage, finished };
};
