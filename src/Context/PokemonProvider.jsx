import React, { useEffect, useState } from 'react'
import { PokemonContext } from './PokemonContext'
import { APIPOKEMON } from './PokemonApi'

export const PokemonProvider = ({ children }) => {

    const [pokemons, setPokemons] = useState([])
    const [pokemonsCart, setPokemonsCart] = useState([])

    const [conterPage, setConterPage] = useState(0);
    const [isLogin, setIsLogin] = useState(false)

    const price = ['52.00', '100.20', '90.00', '250.59', '500.99', '186.50']


    //login
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    };

    const login = async (body) => {
        requestOptions.body = JSON.stringify(body)
        console.log(requestOptions)
        console.log(body)
        const resp = await fetch('http://localhost:8000/api/auth/login', requestOptions);
        const data = await resp.json();
        if (data.respose === 200) {

            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
        return data;

    }
    const logOut = async () => {
        try {
            const token = localStorage.getItem('user_token'); // Obtener el token JWT almacenado localmente
            console.log(token)
            const response = await fetch('http://localhost:8000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado de autorización
                    'Content-Type': 'application/json'
                }
            });

            
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
    
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            return null;
        }
    };
    



    const generatePrice = () => {
        const randomIndex = Math.floor(Math.random() * price.length);
        return price[randomIndex];
    }

    const getAllPokemon = async (offset = 0, numPage) => {
        const resp = await fetch(`${APIPOKEMON}pokemon?limit=20&offset=${offset}`)
        const data = await resp.json();

        console.log(data)

        const promises = data.results.map(async (pokemonUrl) => {

            const resp = await fetch(pokemonUrl.url)
            const data = await resp.json();
            data.price = generatePrice();
            return data;
        })

        const pokemons = await Promise.all(promises);
        setPokemons(pokemons)
    }

    useEffect(() => {
        getAllPokemon();
    }, [])


    const addCartPokemon = (id) => {
        const existPokemon = pokemonsCart.find(p => p.id === id);
        if (existPokemon) return;

        const pokemon = pokemons.find(p => p.id === id);
        setPokemonsCart([...pokemonsCart, pokemon]);
    }

    const deleteCartPokemon = (id) => {
        const pokemons = pokemonsCart.filter(p => p.id !== id);
        setPokemonsCart(pokemons)
    }



    const onNextPage = () => {
        let suma = conterPage + 1;
        setConterPage(suma);
        let numPage = suma * 20;
        getAllPokemon(numPage);
    }

    const onPrevPage = () => {
        let resta = conterPage - 1;
        if (conterPage == 0) return
        setConterPage(resta);
        let numPage = resta * 20;
        getAllPokemon(numPage)
    }


    return (
        <PokemonContext.Provider
            value={{
                addCartPokemon,
                pokemons,
                pokemonsCart,
                deleteCartPokemon,
                getAllPokemon,
                conterPage,
                onNextPage,
                login,
                onPrevPage,
                isLogin,
                logOut,
            }}>
            {children}
        </PokemonContext.Provider>
    )
}
