import React, { useState, useRef } from "react";
import "./Register.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Footer from '../../components/Footer/Footer'
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useAuth } from "../../components/context/AuthContext";


const URL = import.meta.env.VITE_API_URL;

export default function Register({ users, setUsers }) {
	const { login } = useAuth();

	const navigate = useNavigate(); // Hook para redirigir

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange", // Valida mientras escribe el usuario
	});

	//? Preview del avatar
	const [ previewSrc, setPreviewSrc ] = useState("");
	const [ crop, setCrop ] = useState({ aspect: 1/1, width: 100, height: 100, x: 0, y: 0 });
	const [ imgSize, setImsgSize ] = useState({ width: 0, height: 0 });
	const imageRef = useRef(null)


	// Funcion para manejar la seleccion de la imagen
	const handleFileChange = (e) => {
		if(e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => setPreviewSrc(e.target.result);
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	// Funcion para ajustar el recorte inicial
	const handleImageLoad = (img) => {
		const { naturalWidth: width, naturalHeight: height } = img;
		setImsgSize({ width, height });

		// Calcular el recorte inicial centrado
		const minDimension = Math.min(width, height);
		setCrop({
			aspect: 1/1,
			width: (minDimension / width) * 100,
			height: (minDimension / height) * 100,
			x: (width - minDimension) / 2 / width * 100,
			y: (height - minDimension) / 2 / height * 100,
		});
	}

	// Funcion para obtener la imagen recortada
	const getCroppedImage = () => {

		if(!imageRef.current || !crop.width || !crop.height) {
			return Promise.reject("No hay imagen o recorte definido");
		}

		const canvas = document.createElement("canvas");
		const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
		const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

		canvas.width = crop.width * scaleX;
		canvas.height = crop.height * scaleY;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(
			imageRef.current,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width * scaleX,
			crop.height * scaleY
		);

		return new Promise((resolve) => {
			canvas.toBlob((blob) => {
				resolve(blob);
			}, "image/jpeg");
		});
	};

	async function addUser(data) {

		if(!crop.width || !crop.height) {
			Swal.fire("Error", "Por favor ajusta el recorte de la imagen", "error");
			return;

		}

		const blob = await getCroppedImage()
		const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });

		
		const formData = new FormData()
		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("password", data.password);

		if(data.avatar && data.avatar[0]) {
			formData.append("avatar", file)
		} else {
			Swal.fire(
				"Error",
				"Debes seleccionar una foto de perfil.",
				"error"
			)
			return
		}

		try {
			const response = await axios.post(`${URL}/users`, formData, {
				headers: {
					"Content-Type": "multipart/form-data" // Cabecera necesaria para enviar archivos
				}
			});

			// Obtener los datos de la respuesta
			const { user, token } = response.data;
			
			// Iniciar sesión automáticamente después de registrarse
			login(user, token);
			Swal.fire({
				title: "Registro exitoso",
				text: "Te has registrado correctamente.",
				icon: "success",
				theme: "dark",
				confirmButtonColor:"#e8ab00",
				confirmButtonText: "Aceptar",
			})

			setUsers([...users, response.data])
			navigate("/home");
		} catch (error) {
			let errorMessage = "Hubo un problema al registrarte. Intentalo de nuevo"

			if (error.response) {
				errorMessage = error.response.data.message || errorMessage;
				console.error("Error en el backend: ", error.response.data);
			} else if (error.request) {
				console.error("No se recibió respuesta del servidor: ", error.request);
			} else {
				console.error("Error al configurar la solicitud: ", error.message);
			}
			Swal.fire("Error", errorMessage, "error");
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
							onSubmit={handleSubmit(addUser)}
							encType="multipart/form-data"
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
								<input type="file" {...register("avatar", {
									required: "Se requiere una foto de perfil.",
									onChange: handleFileChange
								})}
								id="avatar"
								accept="image/*" // Acepta solo imagenes
							/>

							{previewSrc && (
								<div className="crop-container">
									<ReactCrop
										crop={crop}
										onChange={(c) => setCrop(c)}
										aspect={1}
										ruleOfThirds
										className="custom-react-crop"
									>
										<img
											ref={imageRef}
											src={previewSrc}
											alt="Previsualización de la imagen"
											onLoad={(e) => handleImageLoad(e.currentTarget)}
											style={{ maxWidth: "300px", maxHeight: "60vh", objectFit:"contain" }}
										/>
									</ReactCrop>
								</div>
							)}
							</div>
							<button className="btn" type="submit" disabled={!isValid}>
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
