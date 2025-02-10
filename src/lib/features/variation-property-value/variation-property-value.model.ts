/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { PayloadAction } from '@reduxjs/toolkit';
import Model, { attr, FieldSpecMap, fk, ModelType, oneToOne } from 'redux-orm';
import { VariationPropertyValueActionType } from './variation-property-value.actions';
import { VariationPropertyValueResponses } from './variation-property-value.types';

export class VariationPropertyValue extends Model {
  static modelName: string = 'VariationPropertyValue';

  static fields: FieldSpecMap = {
    // product_variation_id
    productVariationId: fk({
      to: 'Variation',
      as: 'variaton',
      relatedName: 'values',
    }),

    // product_variation_property_id
    productVariationPropertyId: oneToOne({
      to: 'VariationProperty',
      as: 'type',
      relatedName: 'variationValue',
    }),

    // product_variation_property_list_value_id
    productVariationPropertyListValueId: oneToOne({
      to: 'VariationPropertyListValue',
      as: 'value',
      relatedName: 'listValue',
    }),

    valueInt: attr(),
    valueFloat: attr(),
    valueString: attr(),
  };

  static reducer(
    { type, payload }: PayloadAction<unknown>,
    model: ModelType<VariationPropertyValue>,
  ): void {
    switch (type) {
      case VariationPropertyValueActionType.upsert: {
        if (payload as VariationPropertyValueResponses) {
          (payload as VariationPropertyValueResponses).forEach((v) => {
            const {
              value_int: valueInt,
              value_float: valueFloat,
              value_string: valueString,
              product_variation_id: productVariationId,
              product_variation_property_id: productVariationPropertyId,
              product_variation_property_list_value_id:
                productVariationPropertyListValueId,
              ...exclude
            } = v;

            model.upsert({
              ...exclude,
              valueInt,
              valueFloat,
              valueString,
              productVariationId,
              productVariationPropertyId,
              productVariationPropertyListValueId,
            });
          });
        } else {
          console.error('Error type of payload');
        }
        break;
      }

      default:
        break;
    }
  }
}
