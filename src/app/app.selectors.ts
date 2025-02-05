/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { RootState } from '../lib/store';

export const selectActiveCategory = (state: RootState) =>
  state.app.activeCategory;
