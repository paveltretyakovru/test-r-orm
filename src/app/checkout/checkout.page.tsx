/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { Col, Row } from 'react-grid-system';
import styled from 'styled-components';

import navigationImageUrl from './assets/navigation.svg';
import { Button } from '../../lib/ui/button';

export const Checkout = () => {
  return (
    <Wrapper>
      <Row align="start">
        <Col md={4}>
          <Title>Доставка</Title>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <ContentWrapper>
            {/* Date time delivery */}
            <Row>
              <Col>
                <Label>Когда доставить?</Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Placeholder>Выберите дату</Placeholder>
              </Col>
              <Col>
                <Placeholder>Выберите время</Placeholder>
              </Col>
            </Row>

            {/* Addres */}
            <Row style={{ marginTop: 30 }}>
              <Col>
                <Label>Куда доставить?</Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Location>
                  <img src={navigationImageUrl} />
                  <span>Выберите адрес доставки</span>
                </Location>
              </Col>
            </Row>

            {/* Name */}
            <Row style={{ marginTop: 30 }}>
              <Col>
                <Label>Имя</Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input />
              </Col>
            </Row>

            {/* Phone */}
            {/* Name */}
            <Row style={{ marginTop: 30 }}>
              <Col>
                <Label>Телефон</Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input />
              </Col>
            </Row>
          </ContentWrapper>
        </Col>

        <Col md={6}>
          <Info>
            <Row>
              <Col>
                <p>Стоимость товаров:</p>
              </Col>
              <PriceCol>
                <p>12312 ₽</p>
              </PriceCol>
            </Row>

            <Row>
              <Col>
                <p>Стоимость доставки:</p>
              </Col>
              <PriceCol>
                <p>12312 ₽</p>
              </PriceCol>
            </Row>

            <TotalRow>
              <Col>
                <Final>Итого:</Final>
              </Col>
              <PriceCol>
                <Final style={{ fontWeight: 'bold', color: 'black' }}>
                  200784 ₽
                </Final>
              </PriceCol>
            </TotalRow>
          </Info>

          <Button variant="primary">Сделать заказ</Button>
        </Col>
      </Row>
    </Wrapper>
  );
};

Checkout.route = '/checkout';

const PriceCol = styled(Col)`
  text-align: right;
`;

const TotalRow = styled(Row)`
  margin-top: 15px;
`;

const Final = styled.p`
  font-family: Raleway;
  font-weight: 400;
  font-size: 16px;
  line-height: 22.4px;
  letter-spacing: 0%;
`;

const Info = styled.div`
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: var(--gray-blue);

  color: var(--text);
  font-family: Raleway;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.6px;
  letter-spacing: 0px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--gray-blue);
  padding: 10px;
  display: flex;
  border-radius: 45px;
`;

const Location = styled.div`
  border: 1px solid var(--gray-blue);
  padding: 10px;
  display: flex;
  border-radius: 45px;

  img {
    margin-right: 10px;
  }
`;

const Placeholder = styled.div`
  color: var(--text);
  font-family: Raleway;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.6px;
  letter-spacing: 0px;
`;

const Label = styled.div`
  font-family: Raleway;
  font-weight: 600;
  font-size: 16px;
  line-height: 22.4px;
  letter-spacing: 0%;
  margin-bottom: 10px;
`;

const ContentWrapper = styled.div`
  /* border: 1px solid var(--content-border-color); */
  border-radius: 20px;
  /* margin-top: 30px; */
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
  margin-bottom: 30px;
`;

const Wrapper = styled.div``;
