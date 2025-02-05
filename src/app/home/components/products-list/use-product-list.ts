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
import { SessionBoundModel } from 'redux-orm';
import Product from '../../../../lib/features/product/product.model';
import { ProductSchema } from '../../../../lib/features/product/product.types';
import Variation from '../../../../lib/features/variation/variation.model';

export const useProductList = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(selectProducts);
  const variations = useSelector(selectVariations);
  const activeCategory = useAppSelector(selectActiveCategory);
  const categories = useSelector(selectCategories);

  const filteredProducts = useMemo(() => {
    const result: {
      model: SessionBoundModel<Product, {}>;
      variation: SessionBoundModel<Variation, {}> | null;
    }[] = [];

    const currentCategory = categories.find(
      (category) => category.getId() === activeCategory,
    );

    // Возвожно, категории еще не подгрузились
    if (categories.length && variations.length) {
      // Собираем дерево дочерних категорий выбранной категории
      const childCategories: CategoryInterface[] =
        currentCategory?.ref?.childCategories;

      if (childCategories) {
        // Фильтруем товары по категории
        const filtered = products.filter((product) =>
          childCategories.some((c) => c.id === product.ref.categoryId),
        );

        // Заполняем результат учитывая вариации товаров
        filtered.forEach((product) => {
          const productVariatons: SessionBoundModel<Variation, {}>[] =
            product.variations.toModelArray();

          console.log('Product variations', productVariatons);

          if (productVariatons.length) {
            productVariatons.forEach((variation) => {
              result.push({
                model: product,
                variation,
              });
            });
          } else {
            result.push({
              model: product,
              variation: null,
            });
          }
        });
      }
    }

    console.log('RESULT', result);

    return result;
  }, [products, activeCategory, categories, variations]);

  const [loading, setLoading] = useState<boolean>(false);

  // Загружаем список продуктов по выбору категории
  useEffect(() => {
    setLoading(true);

    if (activeCategory && categories.length) {
      const category = categories.find((c) => c.ref.id === activeCategory);

      getProductsOfCategory(
        category?.ref.childCategories.map((c: CategoryInterface) => c.id) || 1,
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
    }
  }, [activeCategory, categories, variations]);

  // Подтягиваем зависимости
  useEffect(() => {
    getVariations()
      .then((response) => dispatch(setVariations(response)))
      .then(() => setLoading(false))
      .catch();
  }, [products, activeCategory]);

  return {
    loading,
    products,
    activeCategory,
    filteredProducts,
    variations,
  };
};
