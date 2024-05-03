import React, { useEffect, useState } from 'react'
import { PokemonContext } from './PokemonContext'
import { APIPOKEMON } from './PokemonApi'

export const PokemonProvider = ({ children }) => {

    const [pokemons, setPokemons] = useState([])
    const [pokemonsCart, setPokemonsCart] = useState([])

    const [allPokemons, setAllPokemons] = useState([])

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

        const resp = await fetch('http://localhost:8000/api/auth/login', requestOptions);
        const data = await resp.json();

        return data;

    }
    const logOut = async () => {
        try {
            const token = localStorage.getItem('user_token'); // Obtener el token JWT almacenado localmente
            console.log(token)

            delete requestOptions.body;
            requestOptions.headers['Authorization'] = 'Bearer ' + token;

            console.log(requestOptions)

            const response = await fetch('http://localhost:8000/api/auth/logout', requestOptions);

            if (!response) {
                throw new Error('No se recibió respuesta del servidor');
            }

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

    const signUp = async (body) => {
        requestOptions.body = JSON.stringify(body)
        const resp = await fetch('http://localhost:8000/api/signup', requestOptions);
        const data = await resp.json();

        return data;

    }



    const generatePrice = () => {
        const randomIndex = Math.floor(Math.random() * price.length);
        return price[randomIndex];
    }

    const getPokemonsByPage = async (offset = 0, numPage) => {
        const resp = await fetch(`${APIPOKEMON}pokemon?limit=20&offset=${offset}`)
        const data = await resp.json();

        const promises = data.results.map(async (pokemonUrl) => {

            const resp = await fetch(pokemonUrl.url)
            const data = await resp.json();
            data.price = generatePrice();
            return data;
        })

        const pokemons = await Promise.all(promises);
        setPokemons(pokemons)
    }

    // const getInfoUser = async () => {
    //     const token = localStorage.getItem('user_token'); // Obtener el token JWT almacenado localmente
    //     requestOptions.headers['Authorization'] = 'Bearer ' + token;
    //     const resp = await fetch('http://localhost:8000/api/auth/me');
    //     const user = resp.json();
    //     return user;
    // }

    const getAllPokemon = async () => {
        const resp = await fetch(`${APIPOKEMON}pokemon?limit=100&offset=0`);
        const data = await resp.json();

        const promises = data.results.map(async (pokemonUrl) => {
            const resp = await fetch(pokemonUrl.url)
            const data = await resp.json();
            data.price = generatePrice();
            return data;
        })

        const pokemons = await Promise.all(promises);
        setAllPokemons(pokemons)
    }
  
    useEffect(() => {
        getAllPokemon();
    },[])

    useEffect(() => {
        getPokemonsByPage();
    }, [])

    const getPokemonsOfCart = async (userId) => {
        const resp = await fetch(`http://localhost:8000/api/cart/getProductsByUser/${userId}`);
        const { data } = await resp.json();
      
        const pokemons = allPokemons.filter(pokemon =>
            data.some(p => {
                if (pokemon.id === p.pokemonId) {
                    pokemon.productId = p.id;
                    return true;
                }

                return false;
            })
        );

        setPokemonsCart(pokemons);
    }

    const addCartPokemon = async (id) => {
        const existPokemon = pokemonsCart.find(p => p.id === id);
        if (existPokemon) return;

        const pokemon = pokemons.find(p => p.id === id);
        const userLoggedIn = JSON.parse(localStorage.getItem('user_data'));

        requestOptions.body = JSON.stringify({
            pokemonId: id,
            user_id: userLoggedIn.id
        })

        const resp = await fetch('http://localhost:8000/api/newCart', requestOptions)
        const data = await resp;

        setPokemonsCart([...pokemonsCart, pokemon])
        return data;
    }

    const deleteCartPokemon = async (id) => {
        //http://localhost:8000/api/cart/getProductsByUser/1
        const resp = await fetch(`http://localhost:8000/api/cart/${id}`, { method: 'DELETE' })
        const data = await resp;

        const pokemons = pokemonsCart.filter(p => p.productId !== id);
       
        setPokemonsCart(pokemons)
        return data;

    }



    const onNextPage = () => {
        let suma = conterPage + 1;
        setConterPage(suma);
        let numPage = suma * 20;
        getPokemonsByPage(numPage);
    }

    const onPrevPage = () => {
        let resta = conterPage - 1;
        if (conterPage == 0) return
        setConterPage(resta);
        let numPage = resta * 20;
        getPokemonsByPage(numPage)
    }


    return (
        <PokemonContext.Provider
            value={{
                addCartPokemon,
                pokemons,
                pokemonsCart,
                deleteCartPokemon,
                getAllPokemon: getPokemonsByPage,
                getPokemonsOfCart,
                conterPage,
                onNextPage,
                login,
                onPrevPage,
                isLogin,
                logOut,
                signUp,
            }}>
            {children}
        </PokemonContext.Provider>
    )
}
