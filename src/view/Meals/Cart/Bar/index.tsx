import React, { FC, useContext } from 'react'
import BagIcon from '../../../../assets/imgs/bag.png'
import Button from '../../../../components/Button'
import CartContext from '../../../../store/cart.context'
import classes from './index.module.css'

const Bar: FC = () => {
  const cartCtx = useContext(CartContext)

  return (
    <div className={classes.Cart} >

      <div className={classes.IconWrapper}>
        <img src={BagIcon}/>
        {
          cartCtx.totalAmount === 0 
          ? 
          null
          : 
          <span className={classes.TotalAmount}>{cartCtx.totalAmount}</span>
        }
      </div>

      {
        cartCtx.totalPrice === 0 
        ?
        <p className={classes.Zero}>未选购商品</p>
        :
        <p className={classes.Price}>{cartCtx.totalPrice}</p>
      }
      
      <Button 
        className={classes.Button} 
        type='primary' 
        disabled={cartCtx.totalAmount === 0} 
        >
        去哈哈
      </Button>
    </div>
  )
}

export default Bar