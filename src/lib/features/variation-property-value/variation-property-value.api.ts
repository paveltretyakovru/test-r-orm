/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import api from '../../api.service';
import { VariationSchema } from '../variation/variation.types';
import { VariationPropertyValueResponses } from './variation-property-value.types';

export const fetchVariationPropertyValues = async (
  variationIds: VariationSchema['id'][],
): Promise<VariationPropertyValueResponses> =>
  await api.get(
    `/api/ProductVariationPropertyValues?filter={"product_variation_id":[${variationIds.join(',')}]}`,
  );
