/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { VariationSchema } from '../variation/variation.types';
import { SessionBoundModel } from 'redux-orm';
import { VariationPropertyValue } from './variation-property-value.model';
import { VariationPropertySchema } from '../variation-property/variation-property.types';
import { VariationPropertyListValueShema } from '../variation-property-list-value/variation-property-list-value.types';

export interface VariationPropertyValueSchema {
  id: number;

  valueInt: number | null;
  valueFloat: number | null;
  valueString: string | null;

  propertyId: VariationPropertySchema['id'];
  variationId: VariationSchema['id'];
  productVariationPropertyListValueId: VariationPropertyListValueShema['id'];
}

export type VariationPropertyValueModel = SessionBoundModel<
  VariationPropertyValue,
  VariationPropertyValueSchema
>;
export type VariationPropertyValueModels = SessionBoundModel<
  VariationPropertyValue,
  VariationPropertyValueSchema
>[];

export interface VariationPropertyValueResponse {
  id: number;

  value_int: number | null;
  value_float: number | null;
  value_string: string | null;

  product_variation_id: VariationSchema['id'];
  product_variation_property_id: VariationPropertySchema['id'];
  product_variation_property_list_value_id: VariationPropertyListValueShema['id'];
}

export type VariationPropertyValueResponses = VariationPropertyValueResponse[];
