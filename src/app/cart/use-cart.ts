/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductModel } from '../../lib/features/product/product.types';
import { VariationModel } from '../../lib/features/variation/variation.types';
import { useAppDispatch } from '../../lib/hooks';
import { selectCartProducts } from '../../lib/features/cart-product/cart-product.selectors';
import {
  CartProductModel,
  CartProductModels,
} from '../../lib/features/cart-product/cart-product.types';
import {
  clearCartAction,
  decrementCartProduct,
  deleteCartProduct,
  incrementCartProduct,
} from '../../lib/features/cart-product/cart-product.actions';
import { useNavigate } from 'react-router';
import { Checkout } from '../checkout/checkout.page';

interface CartProductItem {
  image: string;
  title: string;
  count: number;
  totalPrice: number;
  parameters: string; // Значения вариации

  // Relations
  product: ProductModel;
  variation: VariationModel;
  cartProduct: CartProductModel;
}

export function useCart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartProducts = useSelector(selectCartProducts) as CartProductModels;

  const [products, setProducts] = useState<CartProductItem[]>([]);
  const checkoutDisabled = useMemo(() => !cartProducts.length, [products]);

  const increment = useCallback(
    (cartProduct: CartProductItem) =>
      dispatch(incrementCartProduct(cartProduct.variation.id)),
    [cartProducts],
  );

  const decrement = useCallback(
    (cartProduct: CartProductItem) =>
      dispatch(decrementCartProduct(cartProduct.variation.id)),
    [cartProducts],
  );

  const navigateToCheckout = useCallback(() => {
    navigate(Checkout.route);
  }, []);

  const clearCart = useCallback(
    () =>
      confirm('Вы уверены, что хотите очистить корзину?') &&
      dispatch(clearCartAction()),
    [],
  );

  useEffect(() => {
    const products: CartProductItem[] = [];

    cartProducts.forEach((cartProduct) => {
      let parameters = '';
      const variationValues = cartProduct.variation?.values.toModelArray();
      const variationProduct = cartProduct.variation?.product;
      const count = cartProduct.count;

      if (variationValues && variationProduct && cartProduct.variation) {
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

        const product: CartProductItem = {
          totalPrice: cartProduct.variation.price * cartProduct.count,
          image: variationProduct.images?.toModelArray()[0]?.imageUrl || '',
          title: variationProduct.name,
          count: count || 1,
          parameters: parameters,

          product: variationProduct,
          variation: cartProduct.variation,
          cartProduct: cartProduct,
        };

        products.push(product);
      }
    });

    setProducts(products);
  }, [cartProducts]);

  const total = useMemo(() => {
    let result = 0;

    cartProducts.forEach((product) => {
      if (product.variation) {
        result += product.variation.price * product.count;
      }
    });

    return result;
  }, [cartProducts]);

  const deleteProduct = useCallback(
    (product: CartProductItem) => {
      const conf = window.confirm(
        'Вы уверены, что хотите убрать товар из списка?',
      );

      if (conf) {
        dispatch(deleteCartProduct(product.cartProduct.id));
      }
    },
    [cartProducts],
  );

  return {
    total,
    products,
    increment,
    decrement,
    clearCart,
    cartProducts,
    deleteProduct,
    checkoutDisabled,
    navigateToCheckout,
  };
}
