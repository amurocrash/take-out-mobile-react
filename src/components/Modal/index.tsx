import React, { FC } from 'react'
import Backdrop from '../Backdrop'
import Button from '../Button'
import classes from './index.module.css'

export interface ModalProps {
  content?: string
  visible?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  cancelText?: string
  onCancel?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  okText?: string
  onOk?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Modal: FC<ModalProps> = ({ content, visible = false, onClick, cancelText = '取消', onCancel, okText = '确认', onOk }) => {


  const onCancelClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onCancel && onCancel(e)
    e.stopPropagation()
  }

  const onOkClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onOk && onOk(e)
    e.stopPropagation()
  }

  const onModalBodyClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick && onClick(e)
    e.stopPropagation() // Modal本体被点击时阻止事件往下传播导致其他组件click事件被触发
  }

  const onModalOuterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onCancel && onCancel(e)
    e.stopPropagation()
  }

  return (
    visible 
    ?
    <Backdrop className={classes.ModalOuter} onClick={onModalOuterClick}>
      <div className={classes.Modal} onClick={onModalBodyClick}>
        <p className={classes.Content}>{content || '确认吗？'}</p>
        <div>
          <Button className={classes.Cancel} onClick={onCancelClick}>{ cancelText }</Button>
          <Button className={classes.Ok} onClick={onOkClick} type='primary'>{ okText }</Button>
        </div>
      </div>
    </Backdrop>
    :
    null
  )
}

export default Modal