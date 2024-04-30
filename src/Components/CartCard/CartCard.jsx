import React, { useContext } from 'react'
import './styles.css'
import { Pill } from '../Pill/Pill'



export const CartCard = ({ name, sprite, id, types = [], price, img, event }) => {

    return (
        <article className='cart-card-container'>
            <img className="img-pokemon" src={img} alt='Img de pokemon'></img>
            <div className='cart-card-body'>
                <h3 className='title-cart-card'>{name}</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>

                    {types.map(
                        pokemonType =>
                            <Pill key={pokemonType.slot} text={pokemonType.type.name}></Pill>
                    )}
                </div>
                <footer className='cart-card-footer'>
                    <p className='pokemon-price'>${price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>

                        <button className='less-product'>
                            <i className="bi bi-dash"></i>
                        </button>
                        <p>1</p>
                        <button className='plus-product'>
                            <i className="bi bi-plus"></i>
                        </button>
                    </div>
                </footer>
            </div>
            <button className='but-delete-product' onClick={() => event(id)}>
                <i className="bi bi-x-circle"></i>
            </button>
        </article>
    )
}
