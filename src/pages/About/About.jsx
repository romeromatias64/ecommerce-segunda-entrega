import React from "react";
import './About.css'

export default function About() {
	return (
		<>
			<main className="main-container">
				<div className="title">
					<h2>SOBRE NOSOTROS</h2>
				</div>
				<section className="about-sect sect">
					<div className="info-container">
						<img className="img" src="https://i.imgur.com/oaxC4fQ.png" alt="" />
						<p>
							En Fox Guitarras, contamos con más de 10 años de experiencia en la
							industria musical, lo que nos ha permitido consolidarnos como un
							referente en la venta de guitarras eléctricas y acústicas. Nuestra
							amplia variedad de instrumentos está cuidadosamente seleccionada
							para satisfacer las necesidades de todos los músicos, desde
							principiantes hasta profesionales. Sabemos que cada guitarrista
							tiene su propio estilo y preferencias, por lo que ofrecemos una
							gama diversa que incluye desde modelos clásicos hasta los más
							innovadores.
						</p>
						<p>
							Además de nuestras guitarras, en Fox Guitarras encontrarás una
							selección completa de accesorios esenciales, como cuerdas,
							pedales, amplificadores y estuches, para que puedas equiparte con
							todo lo necesario para mejorar tu experiencia musical. Nuestro
							equipo de expertos está siempre disponible para brindarte
							asesoramiento personalizado y ayudarte a encontrar el instrumento
							perfecto que se ajuste a tus necesidades y expectativas, sin
							importar tu nivel de experiencia.
						</p>
						<p>
							También ofrecemos servicios de reparación y mantenimiento para que
							tu guitarra siempre esté en óptimas condiciones. Nuestro equipo
							técnico está altamente capacitado y utiliza las mejores
							herramientas y materiales para garantizar que tu instrumento suene
							siempre de la mejor manera.
						</p>
						<p>
							Además, creemos firmemente en la importancia de construir una
							comunidad musical sólida. Por eso, organizamos talleres, clínicas
							y eventos en los que los músicos pueden compartir sus
							experiencias, aprender nuevas técnicas y conectarse con otros
							apasionados de la música. Estas actividades son una excelente
							oportunidad para crecer y enriquecer tus habilidades, así como
							para disfrutar de un ambiente amistoso y colaborativo.
						</p>
					</div>
				</section>
				<div className="title">
					<h2>EL EQUIPO</h2>
				</div>
				<section className="team-sect sect">
					<div className="team-container">
						<img
							className="img"
							src="https://i.imgur.com/Uk4TVld.jpeg"
							alt="Matías Romero"
						/>
						<div className="text-container">
							<h3 className="name">Matías Adrián Romero</h3>
							<h4>Músico - Compositor - Luthier</h4>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
