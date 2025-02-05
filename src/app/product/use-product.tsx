/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorResponse, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { upsertProducts } from '../../lib/features/product/product.actions';
import { getProductById } from '../../lib/features/product/product.api';
import { selectProduct } from '../../lib/features/product/product.selectors';
import { useAppDispatch } from '../../lib/hooks';
import { NotFound } from '../not-found.page';
import { getImagesByProductId } from '../../lib/features/image/image.api';
import { upsertImages } from '../../lib/features/image/image.actions';

export function useProduct(id: number) {
  const product = useSelector(selectProduct(id));
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [imagesLoading, setImagesLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!product) {
      setLoading(true);

      getProductById(id)
        .then((product) => dispatch(upsertProducts([product])))
        .catch((error: ErrorResponse) => {
          if (error.status === 400) {
            navigation(NotFound.route);
          } else {
            toast.error(error.statusText);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [product]);

  useEffect(() => {
    setImagesLoading(true);

    getImagesByProductId(id)
      .then((images) => {
        dispatch(upsertImages(images));
      })
      .catch((e) => {
        toast.error('Неудалось получить изображение товара');
      })
      .finally(() => setImagesLoading(false));
  }, []);

  return { product, loading, imagesLoading };
}
