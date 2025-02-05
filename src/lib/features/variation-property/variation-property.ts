/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import Model, { attr } from 'redux-orm';

export class VariationProperty extends Model {
  static modelName: string = 'VariationProperty';

  static fields = {
    id: attr(),
    name: attr(),
    type: attr(),
  };
}
