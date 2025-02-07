/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import styled from 'styled-components';

import { Button } from '../../../../lib/ui/button';
import { Product } from '../../../product/product.page';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import notFoundImageUrl from '../../../../lib/assets/no-image.jpg';
import { selectImages } from '../../../../lib/features/image/image.selectors';
import { selectProduct } from '../../../../lib/features/product/product.selectors';
import {
  ProductModel,
  ProductSchema,
} from '../../../../lib/features/product/product.types';
import {
  VariationModel,
  VariationSchema,
} from '../../../../lib/features/variation/variation.types';
import { selectVariationById } from '../../../../lib/features/variation/variation.selectors';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  product: ProductModel;
}

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>(notFoundImageUrl);
  const [variation, setVariation] = useState<VariationModel>();

  useEffect(() => {
    if (product) {
      const images = product.images.toModelArray();

      if (images.length) {
        setImageUrl(images[0].imageUrl);
      }
    } else {
      setImageUrl(notFoundImageUrl);
    }
  }, [product]);

  useEffect(() => {
    // console.log('Updated variation', product.variations.toRefArray());
  }, [product.variations]);

  const click = useCallback(() => {
    navigate(
      Product.route
        .replace(':productId', `${product.id}`)
        .replace(':variationId', `${variation?.id}`),
    );
  }, [product.id, variation?.id]);

  return (
    <Wrapper onClick={click}>
      <Image image={imageUrl} />
      <Name>{product.name}</Name>

      {(variation && <Price>от {variation.price} ₽</Price>) || (
        <NoPrice>Цена не указана</NoPrice>
      )}

      {variation && (
        <>
          <Discount>
            <span className="old-price">
              {(variation.price * (1 - 0.1)).toFixed(2)} ₽
            </span>{' '}
            <span className="discount-value">-10%</span>
          </Discount>

          <Button variant="tertiary">Добавить в корзину</Button>
        </>
      )}
    </Wrapper>
  );
};

const Discount = styled.div`
  margin-bottom: 10px;

  .old-price {
    width: 68px;
    height: 17px;
    top: 27px;
    gap: 0px;
    opacity: 0px;
    color: var(--color-copyright);
    text-decoration: line-through;
  }

  .discount-value {
    color: var(--pink);
    font-family: Raleway;
    font-size: 14px;
    font-weight: 600;
    line-height: 19.6px;
    text-align: right;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
`;

const NoPrice = styled.div`
  color: var(--text);
  font-family: Raleway;
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Price = styled.div`
  color: var(--blue);
  font-family: Raleway;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Name = styled.div`
  margin-top: 5px;
  font-family: Raleway;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  display: inline-block;
  overflow: hidden !important;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Image = styled.div<{ image: string }>`
  height: 140px;
  background-size: cover;
  background-image: url(${(p) => p.image});
`;

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 180px;
  max-width: 180px;
  margin-top: 30px;

  img {
    height: 150px;
  }
`;
