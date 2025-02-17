/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';

import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import noImageUrl from '../../../lib/assets/no-image.jpg';
import {
  OrderModel,
  OrderStatusValue,
} from '../../../lib/features/order/order.types';
import { VariationModel } from '../../../lib/features/variation/variation.types';
import arrowUpUrl from '../assets/arrow-up.png';
import { useNavigate } from 'react-router';
import { Order } from '../order/order.page';

interface Props {
  order: OrderModel;
}

export const OrderCard = ({ order }: Props) => {
  const navigate = useNavigate();

  const imageUrl = useMemo(() => {
    const variations = order.variations.toModelArray();

    if (variations.length) {
      const images = variations[0].product.images.toModelArray();

      if (images.length) {
        return images[0].imageUrl;
      }
    }

    return noImageUrl;
  }, [order]);

  const goToOrder = useCallback(() => {
    if (order.id) {
      navigate(Order.route.replace(':id', `${order.id}`));
    }
  }, [order]);

  return (
    <Wrapper>
      <Header>
        <Logo>
          <Image src={imageUrl} />
        </Logo>

        <HeadInfo>
          <Title>Xiaomi</Title>

          <DateWrapper>
            <Date>{dayjs(order.createdAt!).format('DD.MM.YYYY HH:mm')}</Date>
            <Link onClick={goToOrder}>Подробнее</Link>
          </DateWrapper>
        </HeadInfo>

        <img src={arrowUpUrl} />
      </Header>

      <DetailLine>
        <DetailBlock>
          <DetailLabel>Статус заказа</DetailLabel>
          <Text>{OrderStatusValue[order.status]}</Text>
        </DetailBlock>

        <DetailBlock>
          <DetailLabel>Номер заказа</DetailLabel>
          <Link onClick={goToOrder}>#{order.id}</Link>
        </DetailBlock>
      </DetailLine>

      <DetailLine>
        <DetailBlock>
          <DetailLabel>Кол-во товаров</DetailLabel>
          <Text>4 шт.</Text>
        </DetailBlock>

        <DetailBlock>
          <DetailLabel>Стоимость заказа</DetailLabel>
          <Text>
            {order.variations.toModelArray().reduce((prev, curr) => {
              const variant = curr as unknown as VariationModel;

              const count = order.counts.find(
                (c) => c.variationId === curr.id,
              )?.count;

              return (count && prev + count * variant.price) || prev;
            }, 0)}
            ₽
          </Text>
        </DetailBlock>

        <DetailBlock>
          <DetailLabel>Адрес доставки</DetailLabel>
          <Text>{order.address}</Text>
        </DetailBlock>
      </DetailLine>
    </Wrapper>
  );
};

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 999px;
`;

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
