import React, { FC } from 'react'
import classes from './index.module.css'

export interface SearchProps {
  onChange: (keyword: string) => void
}

const Search: FC<SearchProps> = ({ onChange }) => {

  return (
    <div className={classes.Search}>
      <div className={classes.InputWrapper}>
        <input 
          className={classes.Input} 
          type='text' 
          placeholder={'请输入关键字'} 
          onChange={ (e: any) => onChange(e.target.value?.trim())} />
        <div className={classes.Icon}>
          <i className='fa fa-search' />
        </div>
      </div>
    </div>
  )
}

export default Search