/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import api from '../../api.service';
import { VariationsResponse } from './variation.types';

export const getVariations = (): Promise<VariationsResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(api.get<VariationsResponse>('/api/ProductVariations'));
    }, 300);
  });
