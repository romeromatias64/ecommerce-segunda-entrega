import React from "react";
import "./Register.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Footer from '../../components/Footer/Footer'

const URL = "https://67cb83383395520e6af589cc.mockapi.io";

export default function Register({ users, setUsers }) {

	const navigate = useNavigate(); // Hook para redirigir

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isValid},
	} = useForm({
		mode: "onChange", // Valida mientras escribe el usuario
	});

	async function addUser(data) {
		const newUser = {
			name: data.name,
			avatar: data.avatar,
			email: data.email,
			password: data.password,
			createdAt: new Date().toLocaleString("es-ES", {
				year: "2-digit",
				month: "2-digit",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			}),
		};

		try {
			const response = await axios.post(`${URL}/users`, newUser);

			setUsers([...users, response.data]);

			reset();

			Swal.fire(
				"Registro exitoso",
				"Te registraste correctamente en Guitarras Fox!",
				"success"
			).then(() => {
				navigate("/home");
			});
		} catch (error) {
			console.error("Error al registrar el usuario: ", error);

			Swal.fire(
				"Error",
				"Hubo un problema al registrarte. Intentalo nuevamente",
				"error"
			);
		}
	}

	return (
		<>
			<main className="main-container">
				<div className="title">
					<h1>REGISTRARSE</h1>
				</div>
				<section className="register-sect sect">
					<div className="register-form">
						<form
							className="formulario"
							onSubmit={handleSubmit(addUser)} // Vincula el formulario con addUser
						>
							<div className="inputs">
								<label htmlFor="name">Nombre completo</label>
								<input
									type="text"
									{...register("name", {
										required: "El nombre es obligatorio.",
										minLength: {
											value: 6,
											message: "El nombre debe tener al menos 6 caracteres.",
										},
										maxLength: {
											value: 30,
											message: "El nombre no puede tener más de 30 caracteres",
										},
										pattern: {
											value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
											message: "El nombre no puede contener caracteres especiales.",
										},
									})}
									id="name"
									placeholder="John Doe"
								/>
								{errors.name && (
									<span className="error">{errors.name.message}</span>
								)}
							</div>
							<div className="inputs">
								<label htmlFor="email">Correo electrónico</label>
								<input
									type="email"
									{...register("email", {
										required:
											"Se requiere un correo electrónico para registrarse",
										minLength: {
											value: 8,
											message: "El correo debe tener al menos 8 caracteres.",
										},
										maxLength: {
											value: 50,
											message: "El correo no puede tener mas de 50 caracteres",
										},
										pattern: {
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
											message: "El correo no es válido.",
										},
									})}
									id="email"
									placeholder="johndoe24@gmail.com"
								/>
								{errors.email && (
									<span className="error">{errors.email.message}</span>
								)}
							</div>
							<div className="inputs">
								<label htmlFor="password">Contraseña</label>
								<input
									type="password"
									{...register("password", {
										required: "La contraseña es obligatoria.",
										minLength: {
											value: 8,
											message:
												"La contraseña debe tener al menos 8 caracteres.",
										},
									})}
									id="password"
									placeholder="********"
								/>
								{errors.password && (
									<span className="error">{errors.password.message}</span>
								)}
							</div>
							<div className="inputs">
								<label htmlFor="password2">Repetir contraseña</label>
								<input
									type="password"
									{...register("password2", {
										required: "Debes repetir la contraseña.",
										validate: (value) => value === watch("password") || "Las contraseñas no coinciden.",
									})}
									id="password2"
									placeholder="********"
								/>
								{errors.password2 && (
									<span className="error">{errors.password2.message}</span>
								)}
							</div>
							<div className="inputs">
								<label htmlFor="avatar">Foto de perfil</label>
								<input type="url" {...register("avatar", {
									required: "Se requiere una foto de perfil."
								})}
								id="avatar"
								placeholder="URL de la imagen" />
							</div>
							<button className="button" type="submit" disabled={!isValid}>
								REGISTRARSE
							</button>
						</form>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
