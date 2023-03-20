import React, { FC } from 'react'
import classes from './index.module.css'

export interface SearchProps {
  value: string
  onChange: (keyword: string) => void
}

const Search: FC<SearchProps> = ({ value, onChange }) => {

  return (
    <div className={classes.Search}>
      <div className={classes.InputWrapper}>
        <input 
          className={classes.Input} 
          type='text' 
          placeholder={'请输入关键字'} 
          value={value}
          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value?.trim())} />
        <div className={classes.Icon}>
          <i className='fa fa-search' />
        </div>
      </div>
    </div>
  )
}

export default Search