/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import api from '../../api.service';
import { VariationsResponse } from './variation.types';

export const getVariations = (): Promise<VariationsResponse> =>
  api.get<VariationsResponse>('/api/ProductVariations?range=[0,1000]');
