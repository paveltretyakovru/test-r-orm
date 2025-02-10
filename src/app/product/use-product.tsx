/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { upsertImages } from '../../lib/features/image/image.actions';
import { getImagesByProductId } from '../../lib/features/image/image.api';
import { upsertProducts } from '../../lib/features/product/product.actions';
import { getProductById } from '../../lib/features/product/product.api';
import { selectProduct } from '../../lib/features/product/product.selectors';
import { ProductSchema } from '../../lib/features/product/product.types';
import { upsertVariationPropertyValuesAction } from '../../lib/features/variation-property-value/variation-property-value.actions';
import { fetchVariationPropertyValues } from '../../lib/features/variation-property-value/variation-property-value.api';
import { upsertVariations } from '../../lib/features/variation/variation.actions';
import { fetchVariationsByProductIds } from '../../lib/features/variation/variation.api';
import { selectVariationsByProductId } from '../../lib/features/variation/variation.selectors';
import {
  VariationModel,
  VariationSchema,
  VariationsResponse,
} from '../../lib/features/variation/variation.types';
import { useAppDispatch } from '../../lib/hooks';
import { fetchVariationPropertiesByIds } from '../../lib/features/variation-property/variation-property.api';
import { VariationPropertyValueSchema } from '../../lib/features/variation-property-value/variation-property-value.types';
import { upsertVariationProperties } from '../../lib/features/variation-property/variation-property.actions';
import { VariationPropertyListValueShema } from '../../lib/features/variation-property-list-value/variation-property-list-value.types';
import { fetchListValuesByIds } from '../../lib/features/variation-property-list-value/variation-property-list-value.api';
import { upsertVariationPropertyListValues } from '../../lib/features/variation-property-list-value/variation-property-list-value.actions';

export function useProduct(productId: number, variationId: number) {
  // System vars
  const dispatch = useAppDispatch();

  // Models
  const product = useSelector(selectProduct(productId));
  const variations = useSelector(selectVariationsByProductId(productId));
  // const currentVariation: VariationModel | null = useMemo(
  //   () =>
  //     (variations &&
  //       variations.length &&
  //       variations.sort((v1, v2) => v1.price - v2.price)[0]) ||
  //     null,
  //   [product, variations, variationId],
  // );

  const currentVariation: VariationModel | null = useMemo(
    () => variations?.find((v) => v.id === variationId) || null,
    [product, variations, variationId],
  );

  // Behavior
  const [loading, setLoading] = useState<boolean>(false);
  const [imagesLoading, setImagesLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log('', var);
  // }, []);

  // Загрузка товара, если страница открыта без ранее загруженной модели
  useEffect(() => {
    if (!product && productId) {
      setLoading(true);

      getAllDataForPage(productId)
        .catch((e) => {
          const m = 'Произошла ошибка загрузки данных товара. Попробуйте позже';
          toast.error(m);
          console.error(m, e);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    async function getAllDataForPage(productId: ProductSchema['id']) {
      await getProduct(productId);

      // Загружаем вариации товаров
      const variations: VariationsResponse = await getVariatons(productId);

      // Загружаем список значений параметров товара
      const values = await getVariationPropertyValues(
        variations.map((v) => v.id),
      );

      // Загружаем список параметров товара
      const properties = await getVariationProperties(
        values.map((v) => v.product_variation_property_id),
      );

      const listValues = await getVariationPropertyListValues(
        values
          .filter((v) => v.product_variation_property_list_value_id)
          .map((v) => v.product_variation_property_list_value_id),
      );

      console.log('Properties list values is fetched', listValues);
    }

    async function getVariationProperties(
      valuesIds: VariationPropertyValueSchema['id'][],
    ) {
      const response = await fetchVariationPropertiesByIds(valuesIds);
      dispatch(upsertVariationProperties(response));

      return response;
    }

    async function getVariationPropertyListValues(
      ids: VariationPropertyListValueShema['id'][],
    ) {
      const response = await fetchListValuesByIds(ids);
      dispatch(upsertVariationPropertyListValues(response));
      return response;
    }

    async function getVariationPropertyValues(ids: VariationSchema['id'][]) {
      const response = await fetchVariationPropertyValues(ids);
      dispatch(upsertVariationPropertyValuesAction(response));
      return response;
    }

    async function getProduct(productId: ProductSchema['id']) {
      const response = await getProductById(productId);
      dispatch(upsertProducts([response]));
      return response;
    }

    async function getVariatons(productId: ProductSchema['id']) {
      const variations = await fetchVariationsByProductIds([productId]);
      dispatch(upsertVariations(variations));
      return variations;
    }
  }, [product, productId, variationId]);

  useEffect(() => {
    setImagesLoading(true);

    getImagesByProductId(productId)
      .then((images) => {
        dispatch(upsertImages(images));
      })
      .catch((e) => {
        toast.error('Неудалось получить изображение товара');
      })
      .finally(() => setImagesLoading(false));
  }, [productId, variationId]);

  return {
    product,
    loading,
    imagesLoading,
    variation: currentVariation,
    variations,
  };
}
