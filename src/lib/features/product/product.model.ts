/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { Schema } from '../../orm';
import { OrmSession } from 'redux-orm/Session';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProductsResponse } from './product.types';
import { productActionType } from './product.actions';
import { attr, fk, many, Model, ModelType, oneToOne } from 'redux-orm';

class Product extends Model {
  static modelName = 'Product';

  static fields = {
    id: attr(),
    name: attr(),
    description: attr(),

    categoryId: fk({
      to: 'Category',
      as: 'category',
      relatedName: 'products',
    }),
  };

  static reducer(
    { type, payload }: PayloadAction<ProductsResponse>,
    Product: ModelType<Product>,
    session: OrmSession<Schema>,
  ) {
    switch (type) {
      case productActionType.upsert: {
        const products = payload;

        products.forEach((productResponse) => {
          const { category_id: categoryId, ...exclude } = productResponse;

          Product.upsert({
            ...exclude,
            categoryId,
          });
        });
        break;
      }

      default:
        break;
    }
  }
}

export default Product;
