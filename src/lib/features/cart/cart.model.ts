/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import Model, { many } from "redux-orm"
import {
  createCartItem,
  deleteAllCartItems,
  deleteCartItem,
  updateCartItem,
} from "../actions/actions"

export default class Cart extends Model {
  static modelName = "Cart"

  static fields = {
    items: many("Product"),
  }

  static reducer({ type, payload }: { type: string; payload: any }, Cart: any) {
    switch (type) {
      case createCartItem.type: {
        const product = payload
        if (!product) {
          console.warn("Unable to create products")
        } else {
          Cart.upsert({ ...product, count: 1 })
        }
        break
      }
      case deleteCartItem.type: {
        const id = payload
        let item = Cart.withId(id)
        item.delete()
        break
      }
      case deleteAllCartItems.type: {
        Cart.all().delete()
        break
      }
      case updateCartItem.type: {
        const { id, ...data } = payload
        let item = Cart.withId(id)
        item.update(data)
        break
      }
      default:
        break
    }
  }
}
