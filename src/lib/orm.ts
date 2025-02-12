/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createReducer, ORM } from 'redux-orm';
import Category from './features/category/category.model';
import Product from './features/product/product.model';
import Variation from './features/variation/variation.model';
import Image from './features/image/image.model';
import { VariationProperty } from './features/variation-property/variation-property.model';
import { VariationPropertyValue } from './features/variation-property-value/variation-property-value.model';
import { VariationPropertyListValue } from './features/variation-property-list-value/variaton-property-list-value.model';
import { Order } from './features/order/order.model';

const schema = {
  Image,
  Order,
  Product,
  Category,
  Variation,
  VariationProperty,
  VariationPropertyValue,
  VariationPropertyListValue,
};

export type Schema = typeof schema;

export const orm: ORM<Schema> = new ORM<Schema>({
  stateSelector: (state) => state.orm,
});

orm.register(
  Image,
  Order,
  Product,
  Category,
  Variation,
  VariationProperty,
  VariationPropertyValue,
  VariationPropertyListValue,
);

export const ormReducer = createReducer(orm);
