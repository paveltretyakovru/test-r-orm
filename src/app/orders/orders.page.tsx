/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { OrderCard } from './components/order-card';
import { useOrders } from './use-orders';

export const Orders = () => {
  const { orders } = useOrders();

  return (
    <Wrapper>
      <Row>
        <Col>
          <Title>История заказов</Title>
        </Col>
      </Row>

      <Row>
        {orders.map((order) => (
          <Col lg={6} md={12} sm={12} className="mb-6">
            <OrderCard key={order.id} order={order} />
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export const ordersRoute = '/orders';
Orders.route = ordersRoute;

const Wrapper = styled.div``;

const Title = styled.h1`
  //styleName: Desktop/H3 20px, Bold;
  font-family: Raleway;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.48px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-bottom: 20px;
`;
