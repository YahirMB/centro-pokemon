import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import './styles.css'
import { Link, useNavigate } from 'react-router-dom'
import { PokemonContext } from '../../Context/PokemonContext'

export const LogIn = () => {
    const navigate = useNavigate();

    const { login } = useContext(PokemonContext)

    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        const resp = await login(data)
        
        if (resp.response === 200 && resp.data.access_token) {
            navigate('/home');
            localStorage.setItem('user_token', resp.data.access_token);
            localStorage.setItem('user_data', JSON.stringify(resp.data.user))
        }else{
            alert('Verifica los campos')
        }

    }



    return (
        <>

            <h1 style={{ position: 'absolute', top: 50, left: 50 }}>Centro Pokemon</h1>

            <section className='login-container'>
                <form className='form-box' onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder='Correo electronico' className='login-input' {...register("email")} />
                    <input placeholder='Password' className='login-input' {...register("password")} />

                    <div className='recover'>
                        <p>¿Se te ha olvida la contraseña? <Link to={''}>Recuperar</Link></p>
                        <p>No tengo cuenta,<Link to={'/signIn'}> registrarme</Link></p>

                    </div>

                    <button className='btn-login'>Iniciar sesión</button>
                </form>
                <div>
                    {/* <img width={150} height={150} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png" alt="imd pokebola" /> */}
                    <img width={500} height={500} src="https://i.pinimg.com/736x/34/c1/e5/34c1e5d371d64a581b1902ec5c4509f4.jpg" alt="imd pokebola" />
                </div>
            </section>
        </>
    )

}
