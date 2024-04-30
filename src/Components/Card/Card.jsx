import React, { useContext } from 'react'
import './styles.css'
import { ButtonCart } from '../ButtonCart/ButtonCart'
import { Pill } from '../Pill/Pill'
import { PokemonContext } from '../../Context/PokemonContext'


export const Card = ({ name, sprite, id, types = [], price, img, typeCard = 'normal' }) => {

    const { addCartPokemon } = useContext(PokemonContext)

    return (

        <article className='card-container'>

            <img className="img-pokemon" src={img} alt='Img de pokemon'></img>
            <div className='card-body'>
                <h3 className='title-card'>{name}</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>

                    {types.map(
                        pokemonType =>
                            <Pill key={pokemonType.slot} text={pokemonType.type.name}></Pill>
                    )}
                </div>
                <footer className='card-footer'>

                    <p className='pokemon-price'>${price}</p>
                    {
                        typeCard == 'normal' ?
                            <ButtonCart
                                event={() => addCartPokemon(id)}
                                isOnlyIcon
                                icon={'bi bi-cart'} />
                            : ''}

                </footer>
            </div>



        </article>
    )
}
