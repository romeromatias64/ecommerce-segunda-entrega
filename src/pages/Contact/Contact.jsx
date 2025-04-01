import "./Contact.css";
import React from "react";

export default function Contact() {
	return (
		<main className="main-container">
			<div className="title">
				<h1>CONTACTO</h1>
			</div>
			<section className="contact-sect sect">
				<div className="contact-form">
					<form className="formulario">
						<div className="inputs">
							<label htmlFor="nombre">Nombre</label>
							<input
								type="text"
								name="nombre"
								id="nombre"
								required=""
								minLength={3}
								placeholder="John"
								pattern="[a-zA-Z ]+$"
							/>
						</div>
						<div className="inputs">
							<label htmlFor="apellido">Apellido</label>
							<input
								id="apellido"
								type="text"
								name="apellido"
								placeholder="Doe"
							/>
						</div>
						<div className="inputs">
							<label htmlFor="email">Correo</label>
							<input
								id="email"
								type="email"
								name="email"
								placeholder="johndoe24@gmail.com"
							/>
						</div>
						<div className="inputs">
							<label htmlFor="obs">Observaciones</label>
							<textarea name="obs" id="obs" rows={5} defaultValue={""} />
						</div>
						<button className="btn" type="submit">
							Enviar
						</button>
					</form>
				</div>
				<div className="contact-map">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d821.098039792518!2d-58.44444568296358!3d-34.5942437899758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5f59ee9875f%3A0x6018eaf0c5177194!2sAv.%20Juan%20Bautista%20Justo%202484%2C%20C1414CXN%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1730134984997!5m2!1ses!2sar"
						width={600}
						height={450}
						style={{ border: 0 }}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>
			</section>
		</main>
	);
}
