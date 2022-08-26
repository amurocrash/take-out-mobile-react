import React, { FC, useContext } from 'react'
import { MealDataProps } from '..'
import CartContext from '../../../store/cart.context'
import Counter from '../../../components/Counter'
import classes from './index.module.css'

interface ItemProps {
  mealData: MealDataProps
  showDetail?: boolean
  priceContentSeq?: 'normal' | 'reverse'
}

const Item: FC<ItemProps> = ({ mealData, showDetail = true, priceContentSeq = 'normal' }) => {
  const cartCtx = useContext(CartContext)

  const priceContent = [
    <span className={classes.Price} key='price'>{mealData.price}</span>,
    <Counter
      key='counter'
      amount={mealData.amount} 
      onAdd={() => { 
        if (cartCtx.addItem) { 
          cartCtx.addItem(mealData)
        }}} 
      onSub={() => {
        if (cartCtx.removeItem) {
          cartCtx.removeItem(mealData)
        }
      }}/>
  ]

  return (
    <div className={classes.Item}>
      <div className={classes.ImgBox}>
        <img src={mealData.img} alt='img' />
      </div>
      <div className={classes.ContentBox}>
        <h2 className={classes.Title}>{mealData.title}</h2>
        {
          showDetail
          ?
          <p className={classes.Desc}>{mealData.desc}</p>
          :
          null
        }
        <div className={classes.PriceWrapper}>
            {
              priceContentSeq === 'normal'
              ?
              priceContent.map(item => item)
              :
              priceContent.reverse().map(item => item)
            }
        </div>
      </div>
    </div>
  )
}

export default Item