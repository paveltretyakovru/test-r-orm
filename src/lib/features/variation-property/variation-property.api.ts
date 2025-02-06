/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import api from '../../api.service';

export const fetchVariationProperties = () => {
  return api.get('/api/ProductVariationProperties');
};
