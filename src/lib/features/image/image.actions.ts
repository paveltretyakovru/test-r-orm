/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { createAction } from '@reduxjs/toolkit';
import { ImagesResponse } from './image.types';

export enum imageActionType {
  upsert = 'image/upsert',
}

export const upsertImages = createAction<ImagesResponse>(
  imageActionType.upsert,
);
