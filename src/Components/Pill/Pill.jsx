import React from 'react'
import './styles.css'

export const Pill = ({text}) => {
  return (
    <p className={text} style={{color:'white'}}>{text}</p>
  )
}
