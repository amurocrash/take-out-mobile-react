import React, { FC, Reducer, useEffect, useState } from 'react'
import Item from './Item'
import Search from '../../components/Search'
import Cart from './Cart'
import CartContext, { CartProps } from '../../store/cart.context'
import mealApi from '../../api/meal'
import classes from './index.module.css'
import { useReducer } from 'react'

export interface MealDataProps {
  id: string
  title: string
  desc: string
  price: number
  img: string
  amount: number
}

export interface ReducerAction<A> {
  type: string
  payload?: A
}

const cartReducer: Reducer<CartProps<MealDataProps>, ReducerAction<MealDataProps>> = (state, action) => {
  const type = action.type
  const meal = action.payload as MealDataProps
  const cart = { ...state }

  if (type === 'ADD') {
    meal.amount++
    if (cart.items.indexOf(meal) === -1) {
      cart.items.push(meal)
    } 

    cart.totalAmount++
    cart.totalPrice += meal.price
    return cart

  } else if (type === 'REMOVE') {
    if (meal.amount === 0 || state.items.indexOf(meal) === -1) {
      return state
    }

    meal.amount--
    if (meal.amount === 0) {
      cart.items.splice(cart.items.indexOf(meal), 1)
    }
    
    cart.totalAmount--
    cart.totalPrice -= meal.price
    return cart

  } else if (type === 'CLEAR') {
    cart.items.forEach(item => item.amount = 0)
    cart.items = []
    cart.totalAmount = 0
    cart.totalPrice = 0
    return cart
  }

  return state
}

const Meals: FC = () => {
  const [mealsData, setMealsData] = useState<MealDataProps[]>([])

  useEffect(() => {
    mealApi.fetchMeals().then(meals => {
      setMealsData(meals)
    })
  }, [])

  const [cartData, cartDataDispatcher] = useReducer<Reducer<CartProps<MealDataProps>, ReducerAction<MealDataProps>>, CartProps<MealDataProps>>(
    cartReducer, {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
    }, () => {
      return {
        items: [],
        totalAmount: 0,
        totalPrice: 0,
      }
    })


  const [keyword, setKeyword] = useState<string>('')
  const onSearchInputChanged = (word: string) => {
    setKeyword(word)
  }

  const filterMeals = (keyword: string) => {
    mealApi.filterMeals(keyword).then(meals => {
      setMealsData(meals)
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      filterMeals(keyword)
    }, 500)
    
    return () => {
      clearTimeout(timer) // 快速输入时节流，防止只要字符变化就发请求
    }
  }, [keyword])

  return (
    <CartContext.Provider value={{ ...cartData, dispatcher: cartDataDispatcher }}>
      <Search value={keyword} onChange={onSearchInputChanged}/>
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