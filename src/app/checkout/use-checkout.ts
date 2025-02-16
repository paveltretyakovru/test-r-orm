/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import dayjs from 'dayjs';
import { useState } from 'react';

export const useCheckout = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);

  return {
    date,
    setDate,
    time,
    setTime,
  };
};
