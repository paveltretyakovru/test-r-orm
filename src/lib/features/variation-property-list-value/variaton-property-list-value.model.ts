/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import Model, { attr, FieldSpecMap } from 'redux-orm';

export class VariationPropertyListValue extends Model {
  static modelName: string = 'VariationPropertyListValue';

  static fields: FieldSpecMap = {
    product_variation_property_id: attr(),
    propertyId: attr(),
    title: attr(),
    value: attr(),
  };
}
