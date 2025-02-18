/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { useCallback, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { VariationPropertySchema } from '../../lib/features/variation-property/variation-property.types';
import { VariationSchema } from '../../lib/features/variation/variation.types';
import { Button } from '../../lib/ui/button';
import { Skeleton } from '../../lib/ui/skeleton';
import { SlideShow } from './components/slideshow';
import { useProduct } from './use-product';
import { ImageModels } from '../../lib/features/image/image.types';
import { useAppDispatch } from '../../lib/hooks';
import { upsertCartProduct } from '../../lib/features/cart-product/cart-product.actions';

export function Product() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId, variationId } = useParams();
  const { product, loading, imagesLoading, variation, variations } = useProduct(
    Number(productId),
    Number(variationId),
  );

  const navigateToVariant = useCallback(
    (variationId: VariationSchema['id']) =>
      navigate(
        Product.variationRoute
          .replace(':productId', `${product?.id || ''}`)
          .replace(':variationId', `${variationId}`),
      ),
    [product, navigate],
  );

  // Группируем вариации товаров и их свойства
  const collectedVariations = useMemo(() => {
    const result: {
      typeId: VariationPropertySchema['id'];
      typeName: VariationPropertySchema['name'];
      values: {
        value: string | number | null;
        variationId: VariationSchema['id'];
      }[];
    }[] = [];

    if (variations) {
      variations.forEach((variant) => {
        const values = variant.values.toModelArray();

        values.forEach((value) => {
          const find = result.find((r) => r.typeId === value.type.id);

          const resultValue =
            value.value?.value ||
            value.valueFloat ||
            value.valueInt ||
            value.valueString;

          if (!find) {
            result.push({
              typeId: value.type.id,
              typeName: value.type.name,
              values: [
                {
                  value: resultValue,
                  variationId: variant.id,
                },
              ],
            });
          } else {
            find.values.push({
              value: resultValue,
              variationId: variant.id,
            });
          }
        });
      });
    }

    return result.map((res) => (
      <Variations key={res.typeId}>
        <VariationLabel>{res.typeName}</VariationLabel>
        <VariationPropertyWrapper>
          {(() => {
            interface variantValueData {
              value: string | number | null;
              variationId: VariationSchema['id'];
            }

            const unic: variantValueData[] = [];

            res.values.forEach((val) => {
              const i = unic.findIndex((p) => p.value === val.value);

              if (i !== -1 && val.variationId === Number(variationId)) {
                unic[i] = val;
              } else if (i === -1) {
                unic.push(val);
              }
            });

            return unic.map((u) => (
              <VariantProperty
                onClick={() => navigateToVariant(u.variationId)}
                className={
                  (`${u.variationId}` === `${variationId}` && 'active') || ''
                }
                key={u.variationId}
              >
                {u.value}
              </VariantProperty>
            ));
          })()}
        </VariationPropertyWrapper>
      </Variations>
    ));
  }, [variations, variationId, productId, product]);

  const addToCard = useCallback(() => {
    if (variation) {
      dispatch(upsertCartProduct({ variationId: variation.id }));
    }
  }, [variation]);

  return (
    (!loading && !imagesLoading && product && variation && (
      <>
        <Row>
          <Col md={12}>
            <Title className="xs:text-center">{product.name}</Title>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <SlideShow images={product.images.toModelArray() as ImageModels} />
          </Col>
          <Col md={8}>
            <Info>
              <Price>
                <PriceValue>{variation.price}₽</PriceValue>
                <PriceFor>за шт.</PriceFor>
              </Price>

              {collectedVariations}

              <Button onClick={addToCard}>
                В корзину за {variation.price}₽
              </Button>
            </Info>
          </Col>
        </Row>
      </>
    )) || <ProductSkeleton />
  );
}

Product.route = '/product/:productId';
Product.variationRoute = '/product/:productId/:variationId';

const VariationPropertyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const VariantProperty = styled.div`
  cursor: pointer;
  border: 1px solid var(--variant-border);
  padding: 10px;
  border-radius: 56px;
  max-width: max-content;
  margin-right: 13px;

  &.active {
    color: var(--blue);
    border: 1px solid var(--blue);
  }
`;

const VariationLabel = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-bottom: 10px;
`;

const Variations = styled.div`
  margin: 16px 0;
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
`;

const PriceValue = styled.div`
  font-family: Raleway;
  font-size: 30px;
  text-align: left;
  font-weight: 700;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-right: 5px;
`;

const PriceFor = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Info = styled.div`
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: var(--gray-blue);
`;

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton variant="text-big" />
      <Skeleton variant="image" />
    </div>
  );
};

const Title = styled.h1`
  font-family: Raleway;
  font-size: 30px;
  font-weight: 700;
  line-height: 38.4px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-bottom: 30px;
`;

const Wrapper = styled.div``;
