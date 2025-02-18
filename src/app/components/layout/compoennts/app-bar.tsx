/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { selectCartProducts } from '../../../../lib/features/cart-product/cart-product.selectors';
import { Avatar } from './avatar';
import { CartIcon } from './cart-icon';
import { Location } from './location';
import { Search } from './search';

export function AppBar() {
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);

  const navigateToRoot = useCallback(() => navigate('/'), []);

  const isLargeScreen = useMediaQuery({ minWidth: 992 });
  const isSmallScreen = useMediaQuery({ maxWidth: 991 });

  return (
    <Wrapper>
      <Col>
        {isLargeScreen && (
          <Row className="items-center justify-between">
            <Col xl={2} lg={2} md={3}>
              <Logo onClick={navigateToRoot}>React</Logo>
            </Col>

            <Col xl={2} lg={3} md={1}>
              <Location />
            </Col>

            <Col xl={6} lg={5} md={5}>
              <Search />
            </Col>

            <Col
              lg={2}
              xl={2}
              md={3}
              style={{ display: 'flex', justifyContent: 'space-around' }}
            >
              <CartIcon value={cartProducts.length || 0} />
              <Avatar path="/avatars/ava-1.png" />
            </Col>
          </Row>
        )}

        {isSmallScreen && (
          <>
            <Row className="items-center justify-between">
              <Col md={3} xs={3}>
                <Logo onClick={navigateToRoot}>React</Logo>
              </Col>

              <Col xs={5} md={4}>
                <Location />
              </Col>

              <Col
                xs={4}
                md={3}
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <CartIcon value={cartProducts.length || 0} />
                <Avatar path="/avatars/ava-1.png" />
              </Col>
            </Row>

            <Row
              className="items-center justify-between"
              style={{ marginTop: 20 }}
            >
              <Col>
                <Search />
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Wrapper>
  );
}

const Logo = styled.div`
  cursor: pointer;
  font-family: Raleway;
  font-size: 37px;
  font-weight: 700;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Wrapper = styled(Row)`
  padding: 20px 0;

  #overlay {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    transition: 0.3s linear;
  }

  #overlay.active {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
