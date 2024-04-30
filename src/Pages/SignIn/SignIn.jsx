import React from 'react'
import './styles.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
export const SignIn = () => {

  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <>

      <h1 style={{ position: 'absolute', top: 50, left: 50 }}>Centro Pokemon</h1>

      <section className='login-container'>
        <form className='form-box' onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='Nombre' className='login-input' {...register("name")} />
          <input placeholder='Apellido' className='login-input' {...register("lastname")} />
          <input placeholder='Correo electronico' className='login-input' {...register("email")} />
          <input placeholder='Password' className='login-input' {...register("password")} />

          <div className='recover'>

            <p>Ya tengo cuenta,  <Link to={'/'}>Iniciar sesión</Link></p>

          </div>

          <button className='btn-login'>Crear cuenta</button>
        </form>
        <div>
          {/* <img width={150} height={150} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png" alt="imd pokebola" /> */}
          <img width={500} height={500} src="https://i.pinimg.com/736x/34/c1/e5/34c1e5d371d64a581b1902ec5c4509f4.jpg" alt="imd pokebola" />
        </div>
      </section>
    </>
  )
}
