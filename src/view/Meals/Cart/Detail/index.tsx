import React, { FC, useContext, useState } from 'react'
import CartContext from '../../../../store/cart.context'
import Backdrop from '../../../../components/Backdrop'
import Item from '../../Item'
import classes from './index.module.css'
import Modal from '../../../../components/Modal'

export interface DetailProps {
  onOuterClick?: (e: React.MouseEvent) => void
}

const Detail: FC<DetailProps> = ({ onOuterClick }) => {
  const cartCtx = useContext(CartContext)
  const [showConfrim, setShowConfirm] = useState<boolean>(false)

  const onBackDropClick = (e: React.MouseEvent) => {
    onOuterClick && onOuterClick(e)
    e.stopPropagation()
  }

  return (
    <Backdrop onClick={onBackDropClick}>
      <Modal 
        content='确认清空购物车吗' 
        visible={showConfrim} 
        onCancel={() => setShowConfirm(false)}
        onOk={() => cartCtx.clearAllItems && cartCtx.clearAllItems() }
      />

      {/* 阻止点击关闭的事件冒泡，可实现Backdrop灰色区域点击关闭 */}
      <div className={classes.CartDetail} onClick={(e) => e.stopPropagation() }>
        <header className={classes.Header}>
          <h2 className={classes.Title}>餐品详情</h2>
          <div className={classes.ClearWrapper}>
            <div><i className='fa fa-trash'></i></div>
            <span onClick={() => setShowConfirm(true)}>清空购物车</span>
          </div>
        </header>

        <div className={classes.MealList}>
          {
            cartCtx.items.map(item => {
              return (
                <Item mealData={item} key={item.id} showDetail={false}/>
              )
            })
          }
        </div>
      </div>
    </Backdrop>
  )
}

export default Detail