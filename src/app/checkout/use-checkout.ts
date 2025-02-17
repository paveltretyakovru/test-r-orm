/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import dayjs from 'dayjs';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '../../lib/features/cart-product/cart-product.selectors';
import { createOrderAction } from '../../lib/features/order/order.actions';
import { useAppDispatch } from '../../lib/hooks';
import { clearCartAction } from '../../lib/features/cart-product/cart-product.actions';
import { useNavigate } from 'react-router';

export const useCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const products = useSelector(selectCartProducts);

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [],
  );

  const onChangePhone = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value),
    [],
  );

  const total = useMemo(() => {
    let result = 0;

    products.forEach((product) => {
      if (product.variation) {
        result += product.variation.price * product.count;
      }
    });

    return result;
  }, [products]);

  const formIsValid = useMemo(
    () => name && address && phone && date && time,
    [name, address, phone, date, time],
  );

  const makeOrder = useCallback(() => {
    if (date && time) {
      // Объединяем date и time
      const combinedDateTime = date
        .hour(time.hour()) // Устанавливаем часы из time
        .minute(time.minute()) // Устанавливаем минуты из time
        .second(0) // Устанавливаем секунды (по умолчанию 0)
        .millisecond(0); // Устанавливаем миллисекунды (по умолчанию 0)

      // Преобразуем в timestamp (количество секунд)
      const timestamp = combinedDateTime.unix();

      dispatch(
        createOrderAction({
          name,
          phone,
          address,
          deliveryDate: timestamp,
        }),
      );

      dispatch(clearCartAction());
      navigate('/orders');
    }
  }, [name, address, phone, date, time, products]);

  return {
    total,

    date,
    setDate,

    time,
    setTime,

    name,
    onChangeName,

    phone,
    onChangePhone,

    address,
    setAddress,

    makeOrder,
    formIsValid,
  };
};
