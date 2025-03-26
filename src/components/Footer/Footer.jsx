import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Footer.css";
import React from "react";
import { faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
	return (
		<>
			<footer id="end" className="main-footer">
				<section className="footer-social">
					<div className="redes">
						<div className="social-container">
							<div className="icon">
                                <FontAwesomeIcon icon={faInstagram} />
							</div>
							<a href="#">Instagram</a>
						</div>
						<div className="social-container">
							<div className="icon">
                                <FontAwesomeIcon icon={faYoutube} />
							</div>
							<a href="#">Youtube</a>
						</div>
						<div className="social-container">
							<div className="icon">
								<FontAwesomeIcon icon={faTwitter} />
							</div>
							<a href="#">Twitter</a>
						</div>
					</div>
				</section>
				<section className="footer-brand">
					<div className="logo">
						<img src="https://i.imgur.com/oaxC4fQ.png" alt="Fox Guitarras" />
					</div>
					<div className="text-container">Copyright © 2024 Fox Guitarras</div>
				</section>
				<section className="footer-info">
					<div className="info-container">
						<h5>LA EMPRESA</h5>
						<div className="links">
							<a href="#">Sobre Nosotros</a>
							<a href="#">Política de privacidad</a>
							<a href="#">Términos y condiciones</a>
						</div>
					</div>
					<div className="info-container">
						<h5>CONTACTO</h5>
						<div className="contacto">
							<p>+54 9 11 3985-5334</p>
							<p>Lunes a Sábado</p>
							<p>De 13:00 a 22:30</p>
						</div>
					</div>
				</section>
			</footer>
		</>
	);
}
