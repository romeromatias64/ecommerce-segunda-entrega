import "./Home.css";
import React from "react";
import Slider from "../../components/Slider/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHandHoldingHeart,
	faMessage,
	faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../components/context/CartContext";
import ProductsList from "../../components/ProductsList/ProductsList";

export default function Home() {

	const { addProduct } = useCart();

	return (
		<>
			<Slider />

			<main className="main-container">
				<section className="products-sect sect">
					<div className="destacados">
						<h2 className="subtitle">MAS VENDIDOS</h2>
						<div className="card-container">
							<ProductsList addProduct={addProduct} />
						</div>
					</div>
				</section>
				<section className="info-sect sect">
					<div className="info">
						<h2 className="subtitle">ACERCA DE NOSOTROS</h2>
						<div className="info-container">
							<div className="info-logo">
								<img
									className="logo-img"
									src="https://i.imgur.com/oaxC4fQ.png"
									alt=""
								/>
								<h3 className="logo-title">Fox Guitarras</h3>
							</div>
							<div className="info-text">
								<p>
									En Fox Guitarras, con más de 10 años en la industria, te
									ofrecemos una amplia variedad de guitarras eléctricas y
									acústicas, además de accesorios y servicios de reparación.
									Nuestro equipo de expertos está listo para ayudarte a
									encontrar el instrumento perfecto, sin importar tu nivel de
									experiencia.
									<br />
									<br />
									También organizamos talleres y eventos para que la comunidad
									musical crezca unida. ¡Vení y descubrí lo que tenemos para
									vos!
								</p>
								<div className="btn-container">
									<a className="btn" href="/pages/about.html">
										Ver más
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="features-sect sect">
					<div className="feature">
						<div className="icon-container">
							<FontAwesomeIcon className="icon" icon={faHandHoldingHeart} />
						</div>
						<div className="text-container">
							La mejor calidad y cuidado de nuestros productos.
						</div>
					</div>
					<div className="feature">
						<div className="icon-container">
							<FontAwesomeIcon className="icon" icon={faMessage} />
						</div>
						<div className="text-container">Atención online las 24hs.</div>
					</div>
					<div className="feature">
						<div className="icon-container">
							<FontAwesomeIcon className="icon" icon={faTruckFast} />
						</div>
						<div className="text-container">Envíos gratis a todo el país.</div>
					</div>
				</section>
			</main>
		</>
	);
}
