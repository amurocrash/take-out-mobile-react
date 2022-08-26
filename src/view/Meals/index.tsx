import React, { FC, useEffect, useState } from 'react'
import Item from './Item'
import Search from '../../components/Search'
import Cart from './Cart'
import CartContext, { CartProps } from '../../store/cart.context'
import mealApi from '../../api/meal'
import classes from './index.module.css'

export interface MealDataProps {
  id: string
  title: string
  desc: string
  price: number
  img: string
  amount: number
}

const Meals: FC = () => {
  const [mealsData, setMealsData] = useState<MealDataProps[]>([])

  useEffect(() => {
    mealApi.fetchMeals().then(meals => {
      setMealsData(meals)
    })
  }, [])

  const [cartData, setCartData] = useState<CartProps<MealDataProps>>({
    items: [],
    totalAmount: 0,
    totalPrice: 0
  })

  const addItem = (meal: MealDataProps) => {
    const cart = { ...cartData }
    meal.amount++
    if (cart.items.indexOf(meal) === -1) {
      cart.items.push(meal)
    } 

    cart.totalAmount++
    cart.totalPrice += meal.price

    setCartData(cart)
  }

  const removeItem = (meal: MealDataProps) => {
    if (meal.amount === 0 || cartData.items.indexOf(meal) === -1) {
      return
    }

    const cart = { ...cartData }
    meal.amount--
    if (meal.amount === 0) {
      cart.items.splice(cart.items.indexOf(meal), 1)
    }
    
    cart.totalAmount--
    cart.totalPrice -= meal.price

    setCartData(cart)
  }

  const clearAllItems = () =>  {
    const newCart = { ...cartData }
    newCart.items.forEach(item => item.amount = 0)
    newCart.items = []
    newCart.totalAmount = 0
    newCart.totalPrice = 0

    setCartData(newCart)
  }

  const filterMeals = (keyword: string) => {
    mealApi.filterMeals(keyword).then(meals => {
      setMealsData(meals)
    })
  }

  return (
    <CartContext.Provider value={{ ...cartData, addItem, removeItem, clearAllItems }}>
      <Search onChange={filterMeals} />
      <div className={classes.Meals}>
        {
          mealsData.map(item => {
            return (
              <Item key={item.id} mealData={item} />
            )
          })
        }
      </div>
      <Cart />
    </CartContext.Provider>
  )
}

export default Meals