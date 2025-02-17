/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';
import { Orders } from '../orders.page';
import { Col, Row } from 'react-grid-system';

import demoInageUrl from '../../../lib/assets/product-demo.png';
import arrowLeftUrl from '../../../lib/assets/arrow-left.svg';

export const Order = () => {
  return (
    <Wrapper>
      <Row>
        <Col>
          <BackLink className="flex justify-start">
            <img src={arrowLeftUrl} />
            Назад
          </BackLink>
        </Col>
      </Row>
      <Row>
        <Col className="mt-6">
          <Title>Заказ №Z2020-17</Title>
        </Col>
      </Row>
      <Row>
        <Col className="mt-10 mb-6">
          <Title>Товары</Title>
        </Col>
      </Row>

      <Row>
        {/* Products */}
        <Col md={6} sm={12}>
          <ProductWrapper className="pb-4">
            <ProductImage src={demoInageUrl} />
            <ProductInfoWrapper>
              <ProductName>
                Смартфон Xiaomi Redmi Note 8 Pro 6/128GB, белый
              </ProductName>
              <ProductCountWrapper>
                <ProductPrice>1 000₽/шт.</ProductPrice>
                <ProductCount>10/10 шт.</ProductCount>
              </ProductCountWrapper>
            </ProductInfoWrapper>
          </ProductWrapper>
        </Col>
      </Row>
    </Wrapper>
  );
};

Order.route = `${Orders.route}/:id`;

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
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
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
  font-family: Raleway;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0%;
  color: var(--blue);
`;

const Wrapper = styled.div``;
