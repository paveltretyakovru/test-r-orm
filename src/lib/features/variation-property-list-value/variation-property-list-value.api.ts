/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import api from '../../api.service';
import {
  VariationPropertyListValueShema,
  VariationPropertyListValuesResponse,
} from './variation-property-list-value.types';

export const fetchListValuesByIds = async (
  ids: VariationPropertyListValueShema['id'][],
): Promise<VariationPropertyListValuesResponse> =>
  await api.get(
    `/api/ProductVariationPropertyListValues?filter={"id":[${ids.join(',')}]}`,
  );
