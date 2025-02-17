/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';
import { Orders } from '../orders.page';

export const Order = () => {
  return <Wrapper>Order</Wrapper>;
};

Order.route = `${Orders.route}/:id`;

const Wrapper = styled.div``;
