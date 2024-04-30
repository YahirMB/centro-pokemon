import React from 'react'
import './styles.css'

export const ButtonCart = ({ text, icon, isOnlyIcon = false,event }) => {


  return (
    <>
      {
        isOnlyIcon ?
          <button className='btn btn-radius' onClick={event}>
            <i className={icon} style={{fontSize:20,color:'limegreen'}}></i>
          </button> :
          <button className='btn btn-radius'>{text}</button>
      }
    </>

  )
}
