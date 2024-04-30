import React from 'react'
import './styles.css'

export const ButtonFilled = ({ text,event }) => {
    return (
        <button 
            onClick={event}
            className='button-filled'>{text}</button>
    )
}
