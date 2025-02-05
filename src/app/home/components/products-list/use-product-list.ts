/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCategories } from '../../../../lib/features/category/category.selectors';
import { CategoryInterface } from '../../../../lib/features/category/category.types';
import { upsertImages } from '../../../../lib/features/image/image.actions';
import { getProductsImages } from '../../../../lib/features/image/image.api';
import { upsertProducts } from '../../../../lib/features/product/product.actions';
import {
  getProducts,
  getProductsOfCategory,
} from '../../../../lib/features/product/product.api';
import { selectProducts } from '../../../../lib/features/product/product.selectors';
import { setVariations } from '../../../../lib/features/variation/variation.actions';
import { getVariations } from '../../../../lib/features/variation/variation.api';
import { selectVariations } from '../../../../lib/features/variation/variation.selectors';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { selectActiveCategory } from '../../../app.selectors';
import { selectImages } from '../../../../lib/features/image/image.selectors';

export const useProductList = () => {
  const dispatch = useAppDispatch();
  const images = useSelector(selectImages);
  const products = useSelector(selectProducts);
  const variations = useSelector(selectVariations);
  const categoryId = useAppSelector(selectActiveCategory);
  const categories = useSelector(selectCategories);

  const filteredProducts = useMemo(() => {
    const currentCategory = categories.find(
      (category) => category.getId() === categoryId,
    );

    // Собираем дерево дочерних категорий выбранной категории
    const childCategories: CategoryInterface[] =
      currentCategory?.ref?.childCategories;

    if (childCategories) {
      const result = products.filter((product) =>
        childCategories.some((c) => c.id === product.ref.categoryId),
      );

      return result;
    }

    return products;
  }, [products, categoryId, categories, images]);

  const [loading, setLoading] = useState<boolean>(false);

  // Загружаем список продуктов по выбору категории
  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const category = categories.find((c) => c.ref.id === categoryId);

      getProductsOfCategory(
        category?.ref.childCategories.map((c: CategoryInterface) => c.id) || 0,
      )
        .then((response) => {
          dispatch(upsertProducts(response));

          getProductsImages(response.map((product) => product.id))
            .then((response) => dispatch(upsertImages(response)))
            .catch(() => {
              toast.error('Произошла ошибка во время загрузки изображений');
            });
        })
        .catch()
        .finally(() => setLoading(false));
    } else {
      console.log('VARIATIONS', variations);

      getProducts()
        .then(async (response) => {
          dispatch(upsertProducts(response));

          try {
            const images = await getProductsImages(
              response.map((product) => product.id),
            );

            console.log('Uploaded images', { images, response });
            dispatch(upsertImages(images));
          } catch (e) {
            toast.error('Произошла ошибка во время загрузки изображений');
          }
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [categoryId]);

  // Подтягиваем зависимости
  useEffect(() => {
    if (products.length) {
      getVariations()
        .then((response) => dispatch(setVariations(response)))
        .then(() => setLoading(false))
        .catch();
    }
  }, [products]);

  return { loading, products, categoryId, filteredProducts, variations };
};
