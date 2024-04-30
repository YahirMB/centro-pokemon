import React, { useState } from 'react'
import './styles.css'

export const Input = ({onChangeValue,value}) => {
 

  return (
      <input 
        onChange={onChangeValue}
        value={value}
        className='input' 
        type='search' 
        placeholder='Pickachu o 15' />
  )
}
