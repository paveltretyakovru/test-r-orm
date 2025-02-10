/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import Model, { attr, ModelType } from 'redux-orm';
import { variationPropertyActions } from './variation-property.actions';
import { VariationPropertiesResponse } from './variation-property.types';

export class VariationProperty extends Model {
  static modelName: string = 'VariationProperty';

  static fields = {
    id: attr(),
    name: attr(),
    type: attr(),
  };

  static reducer(
    { type, payload }: PayloadAction<unknown>,
    model: ModelType<VariationProperty>,
  ): void {
    switch (type as variationPropertyActions) {
      case variationPropertyActions.upsert: {
        (payload as VariationPropertiesResponse).forEach((property) =>
          model.upsert(property),
        );

        break;
      }

      default:
        break;
    }
  }
}
