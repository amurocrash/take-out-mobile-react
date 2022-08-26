import React, { FC } from 'react'
import classes from './index.module.css'

export interface CounterProps {
  amount?: number
  onAdd: () => void
  onSub: () => void
}

const Counter: FC<CounterProps> = (props) => {
  return (
    <div className={classes.Counter}>
      {
        props.amount && props.amount > 0
        ?
        <>
          <button className={classes.Sub} onClick={props.onSub}><i className="fa fa-minus"></i></button>
          <span className={classes.Count}>{props.amount}</span>
        </>
        :
        <>
        </>
      }

      
      <button className={classes.Add} onClick={props.onAdd}><i className="fa fa-plus"></i></button>
    </div>
  )
}

export default Counter