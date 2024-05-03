import React, { useContext, useState } from 'react'

import './styles.css'
import { ButtonFilled } from '../../Components/ButtonFilled/ButtonFilled'
import { PokemonContext } from '../../Context/PokemonContext'
import { Card } from '../../Components/Card/Card'
import { CartCard } from '../../Components/CartCard/CartCard'
import { useEffect } from 'react'

export const Cart = () => {

    const { pokemonsCart, deleteCartPokemon } = useContext(PokemonContext)

    const [sumaTotal, setSumaTotal] = useState(0)

    useEffect(() => {
        const total = pokemonsCart.reduce((temporySum, pokemon) => temporySum + parseFloat(pokemon.price), 0);
        setSumaTotal(parseFloat(total.toFixed(2)));
    }, [pokemonsCart])

    return (


        <div style={{ padding: 20 }}>
            <h1>Carrito de compras</h1>
            {
                (pokemonsCart.length <= 0) ? <h1>No has agreado ningun pokemon</h1>
                    :
                    <div className='cart-container'>
                        <section className='product-box'>
                            {pokemonsCart.map(
                                pokemon => {
                                    //specie 
                                    const { name } = pokemon.species;
                                    return (
                                        <CartCard
                                            price={pokemon.price}
                                            img={pokemon.sprites.other.dream_world.front_default}
                                            types={pokemon.types}
                                            key={pokemon.id}
                                            id={pokemon.productId}
                                            name={name}
                                            event={deleteCartPokemon}
                                        />
                                    )
                                })
                            }
                        </section>
                        <section className='info-box'>
                            <article className='cart-info'>
                                <h2>Tu compra esta casi lista</h2>
                                <div className='detail-row'>
                                    <h4>Total de tu compra</h4>
                                    <p>${sumaTotal}</p>
                                </div>

                                <div className='detail-row'>
                                    <h4>Descuento</h4>
                                    <p>0% de descuento</p>
                                </div>

                                <div className='detail-row'>
                                    <h2>Total a pagar:</h2>
                                    <p>${sumaTotal}</p>
                                </div>
                                <div style={{ width: '50%', alignSelf: 'end' }}>
                                    <ButtonFilled text={'Comprar carrito'} />
                                </div>
                            </article>
                        </section>
                    </div>
            }
        </div>
    )
}
