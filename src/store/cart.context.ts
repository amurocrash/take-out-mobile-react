import React from 'react'
import { MealDataProps } from '../view/Meals'

export interface CartProps<T> {
  items: T[]
  totalAmount: number
  totalPrice: number
  addItem?: (item: T) => void
  removeItem?: (item: T) => void
  clearAllItems?: () => void
}

const CartContext = React.createContext<CartProps<MealDataProps>>({
  items: [],
  totalAmount: 0,
  totalPrice: 0,
})

export default CartContext