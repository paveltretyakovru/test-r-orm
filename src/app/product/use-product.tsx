/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { upsertImages } from '../../lib/features/image/image.actions';
import { getImagesByProductId } from '../../lib/features/image/image.api';
import { upsertProducts } from '../../lib/features/product/product.actions';
import { getProductById } from '../../lib/features/product/product.api';
import { selectProduct } from '../../lib/features/product/product.selectors';
import { upsertVariations } from '../../lib/features/variation/variation.actions';
import { getVariationsByProductId } from '../../lib/features/variation/variation.api';
import { selectVariationById } from '../../lib/features/variation/variation.selectors';
import { useAppDispatch } from '../../lib/hooks';

export function useProduct(productId: number, variationId: number) {
  const product = useSelector(selectProduct(productId));
  const variation = useSelector(selectVariationById(variationId));
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [imagesLoading, setImagesLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('VARIATION', variation);
  }, [variation]);

  useEffect(() => {
    if (!product) {
      setLoading(true);
      getProduct();
      getVariant().finally(() => setLoading(false));
    }

    async function getProduct() {
      const productResponse = await getProductById(productId);
      dispatch(upsertProducts([productResponse]));
    }

    async function getVariant() {
      const variantResponse = await getVariationsByProductId([productId]);

      dispatch(upsertVariations(variantResponse));
    }
  }, [product, variation]);

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
  }, []);

  return { product, loading, imagesLoading, variation };
}
