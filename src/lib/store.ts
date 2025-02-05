/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { orm, ormReducer } from './orm';
import { appSlice } from '../app/app.slice';

const rootReducer = combineSlices(appSlice, {
  orm: ormReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
export const session = orm.session(store.getState().orm);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
