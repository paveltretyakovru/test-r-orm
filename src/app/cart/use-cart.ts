/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartOrder } from '../../lib/features/order/order.selectors';
import {
  VariationModel,
  VariationModels,
} from '../../lib/features/variation/variation.types';
import { ProductModel } from '../../lib/features/product/product.types';
import { useAppDispatch } from '../../lib/hooks';
import {
  addVariationToCart,
  removeVariationFromCart,
} from '../../lib/features/order/order.actions';
import { OrderModel } from '../../lib/features/order/order.types';

interface CartProduct {
  image: string;
  title: string;
  count: number;
  price: number;
  parameters: string; // Значения вариации

  // Relations
  product: ProductModel;
  variation: VariationModel;
}

function getCountOfOrderVariation(
  order: OrderModel,
  variation: VariationModel,
) {
  return order.counts.find((c) => c.variationId === variation.id)?.count || 0;
}

export function useCart() {
  const order = useSelector(selectCartOrder);
  const dispatch = useAppDispatch();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const increment = useCallback(
    (variant: VariationModel) => dispatch(addVariationToCart(variant.id)),
    [order],
  );

  const decrement = useCallback(
    (variant: VariationModel) => dispatch(removeVariationFromCart(variant.id)),
    [order],
  );

  const total = useMemo(() => {
    let result = 0;

    if (order) {
      (order.variations.toModelArray() as unknown as VariationModels).forEach(
        (variation) =>
          (result +=
            getCountOfOrderVariation(order, variation) * variation.price),
      );
    }

    return result;
  }, [order]);

  useEffect(() => {
    if (order) {
      console.log('Cart order', order);
      console.log('Cart variations', order.variations.all().toModelArray());

      const cartProducts: CartProduct[] = [];
      const cartVariations = order.variations
        .all()
        .toModelArray() as unknown as VariationModels;

      cartVariations.forEach((variation) => {
        let parameters = '';
        const variationValues = variation.values.toModelArray();
        const variationProduct = variation.product;
        const count = order.counts.find(
          (c) => c.variationId === variation.id,
        )?.count;

        variationValues.forEach((value, i) => {
          parameters +=
            value.valueInt ||
            value.valueFloat ||
            value.valueString ||
            value.value?.value ||
            '';

          if (i < variationValues.length) {
            parameters += ' / ';
          }
        });

        const product: CartProduct = {
          price: variation.price,
          image: variationProduct.images?.toModelArray()[0]?.imageUrl || '',
          title: variationProduct.name,
          count: count || 1,
          parameters: parameters,

          product: variationProduct,
          variation: variation,
        };

        cartProducts.push(product);
      });

      console.log('CART PRODUCTS', cartProducts);
      setCartItems(cartProducts);
    }
  }, [order]);

  return { order, cartItems, increment, decrement, total };
}
