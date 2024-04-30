import React, { useEffect, useState } from 'react'
import { Card } from '../../Components/Card/Card'
import './styles.css'
import { Input } from '../../Components/SearchInput/Input'
import { useContext } from 'react'
import { PokemonContext } from '../../Context/PokemonContext'
import { ButtonFilled } from '../../Components/ButtonFilled/ButtonFilled'
import { useNavigate } from 'react-router-dom'


export const Home = () => {
  const navigate = useNavigate()
  const { pokemons, pokemonsCart, onNextPage, onPrevPage, conterPage,logOut } = useContext(PokemonContext);
  const [value, setValue] = useState('');
  const [searchPokemos, setSearchPokemons] = useState(pokemons)

  const onSeeCart = () => {
    navigate('/cart')
  }

  useEffect(() => {
    setSearchPokemons(pokemons)
  }, [pokemons])

  const onLogOut = async() => {
    const {response} = await logOut()

    if(response === 200){
      navigate('/')
      localStorage.removeItem('user_token');
    }
  }

  const onChangeValue = (e) => {
    let text = e.target.value;
    let data = pokemons.filter(
      pokemos => pokemos.name.toLowerCase().includes(text.toLowerCase())
        || pokemos.id.toString() === text
    );
    console.log(text)
    setValue(e.target.value)
    setSearchPokemons(data);
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <header className='header'>
        <h2>Centro pokemon</h2>

        <Input
          onChangeValue={onChangeValue}
          value={value}
        />
        <div className='login'>
          <p 
            style={{cursor:'pointer'}}
            onClick={onLogOut}>LogOut</p>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <i className="bi bi-cart" onClick={onSeeCart}></i>
            {
              pokemonsCart.length <= 0 ? '' :
                <p className='num-cart-pokemons'>{pokemonsCart.length}</p>
            }
          </div>
        </div>
      </header>
      <div style={{ justifyContent: 'center', padding: "100px 10px 50px 10px", display: 'flex', flexFlow: 'wrap', gap: 22 }}>

        {
          searchPokemos.map(
            pokemon => {
              const { name } = pokemon.species;
              return (
                <Card
                  price={pokemon.price}
                  img={pokemon.sprites.other.dream_world.front_default}
                  types={pokemon.types}
                  key={pokemon.id}
                  name={name}
                  id={pokemon.id}
                />
              )
            }
          )
        }

      </div>

      <footer className='pagination-container'>
        <ButtonFilled
          event={onPrevPage}
          text={'Previous'} />
        <p className='page-num'>{conterPage + 1}</p>
        <ButtonFilled
          event={onNextPage}
          text={'Next'} />
      </footer>
    </div>
  )
}
