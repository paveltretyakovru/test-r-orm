/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import Model, { many } from "redux-orm"
import { IOrder } from "../../entities/types"
import { setHistoryData } from "../actions/actions"

export default class History extends Model {
  static modelName = "History"

  static fields = {
    items: many("Product"),
  }

  static reducer(
    { type, payload }: { type: string; payload: IOrder[] },
    History: any,
  ) {
    switch (type) {
      case setHistoryData.type: {
        const products: IOrder[] | [] = payload
        if (!products.length) {
          console.warn("Unable to create history data")
        } else {
          History.all().delete()
          products.forEach((product: IOrder | any) => {
            History.create(product)
          })
        }
        break
      }
      default:
        break
    }
  }
}
