/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorySchema } from '../lib/features/category/category.types';

interface InitialState {
  loading: boolean;
  activeCategory: CategorySchema['id'];
}

const initialState: InitialState = {
  loading: false,
  activeCategory: 1,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setActiveCategory(state, action: PayloadAction<CategorySchema['id']>) {
      state.activeCategory = action.payload;
    },
  },
});

export const { reducer, actions } = appSlice;
