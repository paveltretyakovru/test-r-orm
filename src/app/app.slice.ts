/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryInterface } from '../lib/features/category/category.types';

interface InitialState {
  loading: boolean;
  activeCategory: CategoryInterface['id'] | null;
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

    setActiveCstegory(state, action: PayloadAction<CategoryInterface['id']>) {
      state.activeCategory =
        action.payload === state.activeCategory ? null : action.payload;
    },
  },
});

export const { reducer, actions } = appSlice;
