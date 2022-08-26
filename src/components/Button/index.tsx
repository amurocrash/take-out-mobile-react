import React, { FC, ReactNode } from 'react'
import classes from './index.module.css'

export interface ButtonProps {
  children: ReactNode
  className?: string
  type?: 'default' | 'primary'
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Button: FC<ButtonProps> = ({ children, className, type = 'default', disabled = false, onClick }) => {
  let _className = `${classes.Button}`
  if (type === 'primary') {
    _className += ` ${classes.Primary}`
  } else {
    _className += ` ${classes.Default}`
  }

  if (className) {
    _className += ` ${className}`
  }

  if (disabled) {
    _className += ` ${classes.Disabled}`
  }

  return (
    <div className={_className} onClick={onClick}>
      <div className={classes.Wrapper}>
        {
          children
        }
      </div>
    </div>
  )
}

export default Button