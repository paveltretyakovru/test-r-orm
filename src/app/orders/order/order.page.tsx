/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';
import { ordersRoute } from '../orders.page';
import { Col, Row } from 'react-bootstrap';

import demoInageUrl from '../../../lib/assets/product-demo.png';
import noImageUrl from '../../../lib/assets/no-image.jpg';
import arrowLeftUrl from '../../../lib/assets/arrow-left.svg';
import { useOrder } from './use-order';
import { useCallback } from 'react';
import { VariationModel } from '../../../lib/features/variation/variation.types';
import { useNavigate } from 'react-router';

export const Order = () => {
  const navigate = useNavigate();
  const { order } = useOrder();

  const getImageUrl = useCallback((variation: VariationModel) => {
    const images = variation.product.images.toModelArray();

    if (images.length) {
      return images[0].imageUrl;
    }

    return noImageUrl;
  }, []);

  const goToOrders = useCallback(() => {
    navigate('/orders');
  }, []);

  return (
    <Wrapper>
      <Row>
        <Col>
          <BackLink className="flex justify-start" onClick={goToOrders}>
            <img src={arrowLeftUrl} />
            Назад
          </BackLink>
        </Col>
      </Row>
      {order && (
        <>
          <Row>
            <Col className="mt-6">
              <Title>Заказ №{order.getId()}</Title>
            </Col>
          </Row>
          <Row>
            <Col className="mt-10 mb-6">
              <Title>Товары</Title>
            </Col>
          </Row>

          <Row>
            {/* Products */}
            {order.variations.toModelArray().map((variation) => (
              <Col md={6} sm={12} className="mb-6">
                <ProductWrapper className="pb-4">
                  <ProductImage src={getImageUrl(variation)} />
                  <ProductInfoWrapper>
                    <ProductName>{variation.product.name}</ProductName>
                    <ProductCountWrapper className="mt-4">
                      <ProductPrice>{variation.price} ₽/шт.</ProductPrice>
                      <ProductCount>
                        {(() => {
                          const count = order.counts.find(
                            (c) => c.variationId === variation.id,
                          );

                          return count?.count || 0;
                        })()}{' '}
                        шт.
                      </ProductCount>
                    </ProductCountWrapper>
                  </ProductInfoWrapper>
                </ProductWrapper>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Wrapper>
  );
};

Order.route = `/orders/:id`;

const ProductCount = styled.div`
  font-size: 16px;
  text-align: right;
  font-family: Raleway;
  font-weight: 400;
  letter-spacing: 0%;
  color: var(--text);
`;

const ProductPrice = styled.div`
  font-family: Raleway;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0%;
  color: var(--text-dark);
`;

const ProductCountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductName = styled.div`
  font-family: Raleway;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0px;
  color: var(--text);

  display: inline-block;
  overflow: hidden !important;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const ProductWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid var(--content-border-color);
`;

const Title = styled.div`
  font-family: Raleway;
  font-weight: 700;
  font-size: 20px;
  line-height: 23.48px;
  letter-spacing: 0%;
  color: var(--text-dark);
`;

const BackLink = styled.div`
  cursor: pointer;
  font-family: Raleway;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0%;
  color: var(--blue);
`;

const Wrapper = styled.div``;
