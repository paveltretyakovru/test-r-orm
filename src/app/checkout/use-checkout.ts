/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import dayjs from 'dayjs';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

export const useCheckout = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [],
  );

  const onChangePhone = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value),
    [],
  );

  return {
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
  };
};
