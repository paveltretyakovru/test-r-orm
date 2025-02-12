/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { Col, Row } from 'react-grid-system';
import styled from 'styled-components';
import { Button } from '../../lib/ui/button';
import headerImageUrl from './assets/header-bg.png';
import deleteImageUrl from './assets/delete.svg';
import demoPhoneImageUrl from './assets/demo-phone.png';
import minusImageUrl from './assets/minus.svg';
import plusImageUrl from './assets/plus.svg';

export function Cart() {
  return (
    <Wrapper>
      <Row align="end">
        <Col md={4}>
          <Title>Корзина</Title>
        </Col>
        <Col>
          <ClearCart className="md:mt-0">Очистить корзину</ClearCart>
        </Col>
      </Row>
      <Row>
        <Col>
          <ContentWrapper>
            <Header data-testid="Header">
              <Row align="center" style={{ height: '100%' }}>
                <Col>
                  <HeaderTitle className="md:p-6">Xiaomi</HeaderTitle>
                </Col>
                <Col>
                  <CartCostWrapper>
                    <CostTitle>Стоимость корзины:</CostTitle>
                    <Cost>1185000₽</Cost>
                  </CartCostWrapper>
                </Col>
                <Col>
                  <Button>Оформить</Button>
                </Col>
                <Col />
              </Row>
            </Header>

            <Row>
              <Col>
                <ProductListWrapper>
                  <ProductWrapper>
                    <ProductImage>
                      <img src={demoPhoneImageUrl} />
                    </ProductImage>

                    <ProductInforWrapper className="md:mt-0">
                      <ProductName>
                        Смартфон Xiaomi Redmi Note 8 Pro
                      </ProductName>
                      <ProductVariation>6/128GB, белый</ProductVariation>

                      <ProductCountWrapper>
                        <ProductCount>120 шт.</ProductCount>
                        <ProductCountTimer>за 12:48:35</ProductCountTimer>
                        <p>
                          Куплено: <strong>150 шт.</strong>
                        </p>
                      </ProductCountWrapper>
                    </ProductInforWrapper>

                    <ProductCounter>
                      <ProductCounterButton>
                        <img src={minusImageUrl} />
                      </ProductCounterButton>

                      <ProductCounterText>25</ProductCounterText>

                      <ProductCounterButton>
                        <img src={plusImageUrl} />
                      </ProductCounterButton>
                    </ProductCounter>

                    <ProductPrice>от 350 000 ₽</ProductPrice>

                    <Wastebasket className="mt-10 sm:mt-2">
                      <img src={deleteImageUrl} />
                    </Wastebasket>
                  </ProductWrapper>
                </ProductListWrapper>
              </Col>
            </Row>
          </ContentWrapper>
        </Col>
      </Row>
    </Wrapper>
  );
}

Cart.route = '/cart';

const Wastebasket = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 50px;

  :hover {
    color: var(--pink);
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 30px;

    img {
      height: 100%;
    }
  }
`;

const ProductPrice = styled.div`
  //styleName: Desktop/Text 16px, Semibold;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  display: flex;
  align-items: center;
  white-space: nowrap;
  margin: auto;
`;

const ProductCounter = styled.div`
  display: flex;
  max-height: 50px;
  align-items: center;
  border: 1px solid var(--content-border-color);
  border-radius: 35px;
  margin: auto;

  @media only screen and (max-width: 600px) {
    margin-top: 10px;
  }
`;

const ProductCounterButton = styled.div`
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductCounterText = styled.div`
  margin: 0px 26px;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const ProductName = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--text-dark);
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ProductImage = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 20px;

  @media only screen and (max-width: 600px) {
    width: 100%;
    justify-content: center;
    margin-right: 0;
  }
`;

const ProductInforWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ProductVariation = styled(ProductName)`
  color: var(--color-copyright);
`;

const ProductCountWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  flex-wrap: wrap;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    margin: 20px 0;
  }
`;

const ProductCount = styled.div`
  padding: 1px 13px 1px 13px;
  gap: 10px;
  border-radius: 0px 100px 100px 50px;
  border-width: 1px;
  opacity: 0px;
  border-color: var(--blue);
`;

const ProductCountTimer = styled.div`
  width: Hug (103px) px;
  left: 51px;
  margin-right: 10px;
  padding: 1px 20px 1px 20px;
  border-radius: 0px 100px 100px 0px;
  border-width: 1px;
  border-color: var(--pink);
  border-left: none;
  margin-left: -11px;

  font-family: Raleway;
  font-size: 12px;
  font-weight: 600;
  color: var(--pink);
  display: flex;
  align-items: center;
`;

const ProductListWrapper = styled.div`
  padding: 40px 60px;
`;

const HeaderTitle = styled.div`
  //styleName: Desktop/Text 20px, Semibold;
  font-family: Raleway;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  min-height: 100px;
  padding-top: 15px;
  padding-left: 20px;
`;

const CartCostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CostTitle = styled.div`
  //styleName: Desktop/Text 16px, Regular;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;
const Cost = styled.div`
  //styleName: Desktop/H3 20px, Bold;
  font-family: Raleway;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.48px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Header = styled.div`
  min-height: 100px;
  border: 1px solid var(--content-border-color);
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-radius: 20px;
  background-image: url(${headerImageUrl});
  background-repeat: no-repeat;
  background-position: right;
`;

const ContentWrapper = styled.div`
  border: 1px solid var(--content-border-color);
  border-radius: 20px;
  margin-top: 30px;
`;

const ClearCart = styled.div`
  cursor: pointer;
  display: flex;
  align-items: end;
  color: var(--pink);
  font-family: Raleway;
  font-size: 16px;
  font-weight: 600;
  line-height: 18.78px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-top: 30px;
`;

const Title = styled.h1`
  //styleName: Desktop/H3 20px, Bold;
  font-family: Raleway;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.48px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Wrapper = styled.div``;
