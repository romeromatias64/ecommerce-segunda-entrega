import React from "react";
import './Register.css'

export default function Register() {
	return (
		<>
			<main className="main-container">
				<div className="title">
					<h1>REGISTRARSE</h1>
				</div>
				<section className="register-sect sect">
					<div className="register-form">
						<form className="formulario">
							<div className="inputs">
								<label htmlFor="nombre-completo">Nombre completo</label>
								<input
									type="text"
									name="nombre-completo"
									id="nombre-completo"
									required
									minLength={3}
									placeholder="John Doe"
									pattern="[a-zA-Z ]+$"
									autofocus=""
								/>
							</div>
							<div className="inputs">
								<label htmlFor="mail">Correo</label>
								<input
									id="mail"
									type="email"
									name="mail"
									placeholder="johndoe24@gmail.com"
									required
								/>
							</div>
							<div className="inputs">
								<label htmlFor="password">Contraseña</label>
								<input
									type="password"
									name="contraseña"
									id="password"
									placeholder="********"
									required
									minLength={8}
								/>
							</div>
							<div className="inputs">
								<label htmlFor="password2">Repetir contraseña</label>
								<input
									type="password"
									name="contraseña"
									id="password2"
									placeholder="********"
									required
									minLength={8}
								/>
							</div>
							<div className="inputs">
								<label htmlFor="date">Fecha de nacimiento</label>
								<input
									type="date"
									name="fecha de nacimiento"
									id="date"
									required
								/>
							</div>
							<div className="inputs">
								<label htmlFor="provincia">Seleccionar provincia</label>
								<select name="provincia" id="provincia" required>
									<option value="BA">Buenos Aires</option>
									<option value="CA">Catamarca</option>
									<option value="CHA">Chaco</option>
									<option value="CH">Chubut</option>
									<option value="COR">Córdoba</option>
									<option value="CRT">Corrientes</option>
									<option value="ER">Entre Ríos</option>
									<option value="FOR">Formosa</option>
									<option value="JU">Jujuy</option>
									<option value="PAM">La Pampa</option>
									<option value="MEN">Mendoza</option>
									<option value="MIS">Misiones</option>
									<option value="NEU">Neuquén</option>
									<option value="RN">Río Negro</option>
									<option value="SA">Salta</option>
									<option value="SJ">San Juan</option>
									<option value="SL">San Luis</option>
									<option value="SC">Santa Cruz</option>
									<option value="SF">Santa Fe</option>
									<option value="SE">Santiago del Estero</option>
									<option value="TF">Tierra del Fuego</option>
									<option value="TU">Tucumán</option>
								</select>
							</div>
							<button className="btn" type="submit">
								REGISTRARSE
							</button>
						</form>
					</div>
				</section>
			</main>
		</>
	);
}
