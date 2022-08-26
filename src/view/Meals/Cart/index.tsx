import React, { FC, useContext, useEffect, useState } from 'react'
import CartContext from '../../../store/cart.context'
import Detail from './Detail'
import Checkout from '../Checkout'
import Bar from './Bar'

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
    <div>
      { isDetailShow && <Detail onOuterClick={() => setShowDetail(false)}/> }

      { isCheckoutShow && <Checkout onClose={() => setCheckoutShow(false)}/> }

      <Bar onBarClick={handleDetailShow} onButtonClick={handleCheckoutShow}/>
    </div>
  )
}

export default Cart