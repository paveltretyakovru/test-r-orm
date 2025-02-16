/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';

import logoUrl from '../assets/mi.png';
import arrowUpUrl from '../assets/arrow-up.png';

export const OrderCard = () => {
  return (
    <Wrapper>
      <Header>
        <Logo>
          <img src={logoUrl} />
        </Logo>

        <HeadInfo>
          <Title>Xiaomi</Title>

          <DateWrapper>
            <Date>21.12.2020</Date>
            <Link>Подробнее</Link>
          </DateWrapper>
        </HeadInfo>

        <img height={20} src={arrowUpUrl} />
      </Header>

      <DetailLine>
        <DetailBlock>
          <DetailLabel>Статус заказа</DetailLabel>
          <Text>Оплачен/Завершён</Text>
        </DetailBlock>

        <DetailBlock>
          <DetailLabel>Номер заказа</DetailLabel>
          <Link>#664-333</Link>
        </DetailBlock>
      </DetailLine>

      <DetailLine>
        <DetailBlock>
          <DetailLabel>Кол-во товаров</DetailLabel>
          <Text>4 шт.</Text>
        </DetailBlock>

        <DetailBlock>
          <DetailLabel>Стоимость заказа</DetailLabel>
          <Text>250 000₽</Text>
        </DetailBlock>

        <DetailBlock>
          <DetailLabel>Адрес доставки</DetailLabel>
          <Text>ул. Коммунистич...д.1, стр.1</Text>
        </DetailBlock>
      </DetailLine>
    </Wrapper>
  );
};

const Link = styled.span`
  font-family: Raleway;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0px;
  color: var(--blue);
`;

const Text = styled.div`
  font-family: Raleway;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0px;
`;

const DetailLabel = styled.div`
  font-family: Raleway;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0px;
  color: var(--text);
`;

const DetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const DetailLine = styled.div`
  display: flex;
  margin-top: 10px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Date = styled.span`
  font-family: Raleway;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0%;
  margin-right: 10px;
`;

const Title = styled.div`
  font-family: Raleway;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0%;
`;

const HeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: 10px;
`;

const Logo = styled.div`
  width: 50;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  padding: 20px;
  border-radius: 32px;
  border: 1px solid var(--content-border-color);
`;
