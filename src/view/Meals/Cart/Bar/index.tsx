import React, { FC, useContext } from 'react'
import BagIcon from '../../../../assets/imgs/bag.png'
import Button from '../../../../components/Button'
import CartContext from '../../../../store/cart.context'
import classes from './index.module.css'

export interface BarProps {
  onBarClick?: (e: React.MouseEvent) => void
  showBag?: boolean
  buttonText?: string
  onButtonClick?: (e: React.MouseEvent) => void
}

const Bar: FC<BarProps> = ({ onBarClick, showBag = true, buttonText = '去结算', onButtonClick }) => {
  const cartCtx = useContext(CartContext)

  return (
    <div className={classes.Cart} onClick={onBarClick}>

      {
        showBag 
        &&
        <div className={classes.IconWrapper}>
          <img src={BagIcon}/>
          { cartCtx.totalAmount !== 0 && <span className={classes.TotalAmount}>{cartCtx.totalAmount}</span> }
        </div>
      }

      {
        cartCtx.totalPrice === 0 
        ?
        <p className={classes.Zero}>未选购商品</p>
        :
        <p className={classes.Price} style={showBag ? {} : {marginLeft: '60rem'}}>{cartCtx.totalPrice}</p>
      }
      
      <Button 
        className={classes.Button} 
        type='primary' 
        disabled={cartCtx.totalAmount === 0}
        onClick={onButtonClick}
        >
        {buttonText}
      </Button>
    </div>
  )
}

export default Bar