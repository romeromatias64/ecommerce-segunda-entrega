import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';

const URL = import.meta.env.VITE_API_URL;

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange"});

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${URL}/login`, data)
            console.log(response.data)
        } catch (error) {
            console.log("Error al iniciar sesión: ", error);
        }
    }

    return (
        <section className="login">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='title'>Iniciar Sesión</h1>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" {...register("email", {
                            required: "Se requiere un email",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Email no válido"
                            }
                        })} placeholder='Ingresa tu email' />
                        {errors.email && <span className='error'>{errors.email.message}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" {...register("password", {
                            required: "Se requiere una contraseña",
                            minLength: {
                                value: 8    ,
                                message: "La contraseña debe tener al menos 8 caracteres."
                            },
                        })} placeholder='Ingresa tu contraseña' />
                        {errors.password && <span className='error'>{errors.password.message}</span>}
                    </div>
                    {/* <div className="input-group">
                        <label htmlFor="rememberMe">
                            <input type="checkbox" {...register("rememberMe")} /> Recordarme
                        </label>
                    </div> */}
                    <button className='btn' type='submit'>Iniciar Sesión</button>
                </form>
            </div>
        </section>
    )
}
