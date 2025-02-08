/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
export enum VariantProprtyType {
  str = 0,
  num = 1,
  float = 2,
  list = 3,
}

export interface VariationPropertySchema {
  id: number;
  type: VariantProprtyType;
  name: number;
}

export interface VariationPropertyResponse {
  id: number;
  type: VariantProprtyType;
  name: number;
}

export type VariationPropertiesResponse = VariationPropertiesResponse[];
