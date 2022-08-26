import React, { FC, useContext, useEffect, useState } from 'react'
import classes from './index.module.css'
import BagIcon from '../../../assets/imgs/bag.png'
import CartContext from '../../../store/cart.context'
import Detail from './Detail'
import Button from '../../../components/Button'
import Checkout from '../Checkout'

const Cart: FC = () => {
  const cartCtx = useContext(CartContext)
  const [isDetailShow, setShowDetail] = useState<boolean>(false)

  useEffect(() => {
    if (cartCtx.totalAmount === 0) {
      setShowDetail(false)
    }
  }, [cartCtx.totalAmount])

  const handleDetailShow = () => {
    if (cartCtx.totalAmount === 0) {
      return
    } 

    setShowDetail(prevState => !prevState)
  }

  const handleCheckoutShow = () => {
    if (cartCtx.totalAmount === 0) {
      return
    }

    setCheckoutShow(prevState => !prevState)
  }

  const [isCheckoutShow, setCheckoutShow] = useState<boolean>(false)

  return (
    <div className={classes.Cart} onClick={handleDetailShow} >

      { isDetailShow && <Detail onOuterClick={() => setShowDetail(false)}/> }

      { isCheckoutShow && <Checkout onClose={() => setCheckoutShow(false)}/> }
      

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
        onClick={handleCheckoutShow}
        >
        去结算
      </Button>
    </div>
  )
}

export default Cart