/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import api from '../../api.service';
import {
  VariationPropertiesResponse,
  VariationPropertySchema,
} from './variation-property.types';

export const fetchVariationProperties = () => {
  return api.get('/api/ProductVariationProperties');
};

export const fetchVariationPropertiesByIds = async (
  ids: VariationPropertySchema['id'][] = [],
): Promise<VariationPropertiesResponse> =>
  await api.get<VariationPropertiesResponse>(
    `/api/ProductVariationProperties?filter={"id":[${ids.join(',')}]}`,
  );
