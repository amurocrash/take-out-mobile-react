import React, { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import classes from './index.module.css'

const backdropRoot = document.getElementById('backdrop-root') as HTMLElement

export interface BackdropProps {
  className?: string
  children?: ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Backdrop: FC<BackdropProps> = (props) => {
  return ReactDOM.createPortal(
    <div className={`${classes.Backdrop} ${props.className || ''}}`} onClick={props.onClick}>
      { props.children }
    </div>,
    backdropRoot
  )
}

export default Backdrop