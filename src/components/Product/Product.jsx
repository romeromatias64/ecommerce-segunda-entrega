import React from "react";
import { useCart } from "../context/CartContext";
import './Product.css'

export default function Product({ product }) {

	const { addProduct } = useCart()

	return (
		<>
			<div className="card" key={product.id}>
				<a className="card-link" href="" />
				<div className="card-content">
					<a className="card-link" href="">
						<div className="img-container">
						<img
							className="card-image"
							src={product.image}
							alt="Fender Stratocaster"
						/>

						</div>
					</a>
					{/* <div className="card-status sale">Oferta</div> */}
				</div>
				<div className="card-info">
					<h3 className="card-title">
						{product.title}
					</h3>
					<div className="card-price">
						{/* <span className="descuento">$1.818.960,00</span> $1.622.315,00 */}
						{product.price}
					</div>
					<div className="card-buttons">
						<button className="btn card-btn" onClick={() => addProduct(product)} >
							Añadir al carrito
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
