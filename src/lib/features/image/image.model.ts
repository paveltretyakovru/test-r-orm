/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import { attr, fk, Model, ModelType } from 'redux-orm';
import { imageActionType } from './image.actions';
import { ImagesResponse } from './image.types';

class Image extends Model {
  static modelName = 'Image';

  static fields = {
    id: attr(),
    imageName: attr(),
    imageUrl: attr(),

    productId: fk({
      to: 'Product',
      as: 'productId',
      relatedName: 'images',
    }),
  };

  static reducer(
    { type, payload }: PayloadAction<any>,
    Image: ModelType<Image>,
  ) {
    switch (type) {
      case imageActionType.upsert: {
        const responseImages = payload as ImagesResponse;

        if (!responseImages.length) {
          console.warn('Unable to create products');
        } else {
          responseImages.forEach((responseImage) => {
            const {
              image_name: imageName,
              image_url: imageUrl,
              product_id: productId,
              ...exclude
            } = responseImage;

            Image.upsert({
              ...exclude,
              imageUrl,
              imageName,
              productId,
            });
          });
        }
        break;
      }

      default:
        break;
    }
  }
}

export default Image;
