import React from "react";
import "./ProductDetail.css";
import { useCart } from "../../components/context/CartContext";

export default function ProductDetail({ product }) {
	const { addProduct } = useCart();

	return (
		<>
			<main className="main-container main-detail-container">
				<section className="product-sect sect">
					<div className="card">
						<img
							className="image"
							src="https://i.imgur.com/zwDFy4E.png"
							alt="Fender Stratocaster"
						/>
						<div className="card-content">
							<h1 className="card-title">
								Fender American Professional II Stratocaster® HSS
							</h1>
							<ul className="card-list">
								<li>Dos pastillas Stratocaster de bobina simple V-Mod II</li>
								<li>Pastilla Humbucking Bridge DoubleTap ™</li>
								<li>
									Trémolo de 2 puntos mejorado con bloque de acero laminado en
									frío
								</li>
								<li>
									Perfil de mástil profundo en forma de "C" con bordes de
									diapasón redondeados
								</li>
								<li>
									Cejilla de hueso; 22 trastes altos y estrechos para facilitar
									los bendings
								</li>
								<li>
									El circuito Treble Bleed mantiene los agudos al reducir el
									volumen
								</li>
								<li>Incluye estuche rígido Elite Molded</li>
							</ul>
							<div className="card-text">
								<p>
									"La American Professional II Stratocaster® HSS se basa en más
									de sesenta años de innovación, inspiración y evolución para
									satisfacer las demandas del músico de hoy en día. Nuestro
									popular mástil “Deep C" ahora tiene bordes de diapasón
									redondeados, un acabado satinado "Super-Natural" y un talón de
									mástil recién esculpido para una sensación sumamente cómoda y
									de fácil acceso al registro superior.
									<br />
									Las nuevas pastillas de bobina simple V-Mod II Stratocaster
									son más articuladas que nunca y conservan la calidez y el
									timbre de campana mientras que la pastilla del puente
									DoubleTap™ ofrece tonos humbucking contundentes y sonidos
									calibrados de bobina simple con solo presionar un botón.
									<br />
									Un trémolo mejorado de 2 puntos con un bloque de acero
									laminado en frío aumenta el sustain, la claridad y el brillo
									de alta gama.
									<br />
									La American Pro II Stratocaster HSS tiene el sonido y
									sensación clásicos pero con amplias mejoras que se suman a las
									habituales para marcar un nuevo estándar para instrumentos
									profesionales ".
								</p>
							</div>
							<div className="card-price">
								<span className="descuento">$1.818.960</span> $1.622.315
							</div>
							<button className="card-btn btn" onClick={() => addProduct(product)}>Añadir al carrito</button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
