/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { Col, Row } from 'react-grid-system';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Skeleton } from '../../lib/ui/skeleton';
import { SlideShow } from './components/slideshow';
import { useProduct } from './use-product';
import { useEffect } from 'react';

interface Props {}

export function Product(props: Props) {
  const { id } = useParams();
  const { product, loading, imagesLoading } = useProduct(Number(id));

  return (
    (!loading && !imagesLoading && product && (
      <>
        <Row>
          <Col md={12}>
            <Title className="xs:text-center">{product.name}</Title>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <SlideShow images={product.images.toModelArray()} />
          </Col>
          <Col md={8}>
            <Info>
              <Price>
                <PriceValue>{(product as any).variation?.value}</PriceValue>
                <PriceFor>за шт.</PriceFor>
              </Price>
            </Info>
          </Col>
        </Row>
      </>
    )) || <ProductSkeleton />
  );
}

Product.route = '/product/:id';

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
