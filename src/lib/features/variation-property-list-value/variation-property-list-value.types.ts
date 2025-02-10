/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { SessionBoundModel } from 'redux-orm';
import { VariationPropertySchema } from '../variation-property/variation-property.types';
import { VariationPropertyListValue } from './variaton-property-list-value.model';

export interface VariationPropertyListValueShema {
  id: number;
  value: string;
  productVariationPropertyId: VariationPropertySchema['id'];
}

export type VariationPropertyListValueModel = SessionBoundModel<
  VariationPropertyListValue,
  VariationPropertyListValueShema
>;
export type VariationPropertyValueModels = SessionBoundModel<
  VariationPropertyListValue,
  VariationPropertyListValueShema
>[];

export interface VariationPropertyListValueResponse {
  id: number;
  value: string;
  product_variation_property_id: VariationPropertySchema['id'];
}

export type VariationPropertyListValuesResponse =
  VariationPropertyListValueResponse[];
