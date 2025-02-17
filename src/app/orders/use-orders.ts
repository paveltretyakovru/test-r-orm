/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useSelector } from 'react-redux';
import { selectOrders } from '../../lib/features/order/order.selectors';
import { useEffect } from 'react';

export const useOrders = () => {
  const orders = useSelector(selectOrders);

  useEffect(() => {
    console.log('ORDERS', orders);
  }, [orders]);

  return {
    orders,
  };
};
