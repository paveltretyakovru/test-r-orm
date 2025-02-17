/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectOrder } from '../../../lib/features/order/order.selectors';
import { useEffect } from 'react';

export function useOrder() {
  const { id } = useParams();
  const order = useSelector(selectOrder(Number(id)));

  useEffect(() => {
    console.log('Order goted', order);
  }, [order]);

  return { order };
}
