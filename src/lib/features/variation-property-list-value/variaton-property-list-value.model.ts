/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import Model, {
  attr,
  FieldSpecMap,
  ModelType,
  oneToOne,
  Session,
} from 'redux-orm';
import { variationPropertyListValueAction } from './variation-property-list-value.actions';
import { VariationPropertyListValuesResponse } from './variation-property-list-value.types';

export class VariationPropertyListValue extends Model {
  static modelName: string = 'VariationPropertyListValue';

  static fields: FieldSpecMap = {
    // product_variation_property_id
    propertyId: oneToOne({
      to: 'VariationProperty',
      as: 'property',
      relatedName: 'listValue',
    }),
    title: attr(),
    value: attr(),
  };

  static reducer(
    { type, payload }: PayloadAction<unknown>,
    model: ModelType<VariationPropertyListValue>,
  ): void {
    switch (type) {
      case variationPropertyListValueAction.upsert: {
        (payload as VariationPropertyListValuesResponse).forEach(
          (listValue) => {
            model.upsert(listValue);
          },
        );

        break;
      }

      default:
        break;
    }
  }
}
