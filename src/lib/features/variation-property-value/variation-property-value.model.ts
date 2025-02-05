/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import Model, { attr, FieldSpecMap } from 'redux-orm';

export class VariationPropertyValue extends Model {
  static modelName: string = 'VariationPropertyValue';

  static fields: FieldSpecMap = {
    // product_variation_id
    productVariationId: attr(),

    // product_variation_property_id
    productVariationPropertyId: attr(),

    valueString: attr(),
    valueInt: attr(),
    valueFloat: attr(),
    productVariationPropertyListValueId: attr(),
  };
}
