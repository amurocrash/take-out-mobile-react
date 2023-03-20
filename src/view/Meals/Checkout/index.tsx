import React, { FC, useContext } from 'react'
import ReactDOM from 'react-dom'
import CartContext from '../../../store/cart.context'
import Item from '../Item'
import Bar from '../Cart/Bar'
import classes from './index.module.css'

const checkoutRoot = document.getElementById('checkout-root') as HTMLElement

export interface CheckoutProps {
  onClose: () => void
}

const Checkout: FC<CheckoutProps> = ({ onClose }) => {
  const cartCtx = useContext(CartContext)

  // useEffect(() => {
  //   if (cartCtx.totalAmount === 0) {
  //     onClose()
  //   }
  // }, [cartCtx.totalAmount])

  return ReactDOM.createPortal(
    <div className={classes.Checkout}>
      <div className={classes.Close} onClick={onClose}>
        <i className='fa fa-arrow-left'></i>
      </div>

      <div className={classes.Content}>
        <header className={classes.Header}>
          餐品详情
        </header>

        <div>
          <div className={classes.MealList}>
            {
              cartCtx.items.map(item => {
                return (
                  <Item 
                    mealData={item} 
                    key={item.id} 
                    showDetail={false} 
                    priceContentSeq='reverse'
                    />
                )
              })
            }
          </div>
        </div>

        <footer className={classes.Footer}>
          <span className={classes.TotalPrice}>{cartCtx.totalPrice}</span>
        </footer>
      </div>

      <Bar showBag={false} buttonText='去支付'/>

    </div>, 
  checkoutRoot)
}

export default Checkout