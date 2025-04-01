import React from "react";
import { useCart } from "../context/CartContext";
import "./Product.css";
import { Link } from "react-router";

export default function Product({ product }) {
	const { addProduct } = useCart();

	function formatNumber(value) {
		if (!value) return "";
		return new Intl.NumberFormat("es-AR", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	}

	return (
		<>
			<div className="card" key={product.id}>
				{product.discount > 0 && (
					<span className="card-status sale">-{product.discount}%</span>
				)}
				<Link to="/product-detail" className="card-link" product={product} />
				<div className="card-content">
					<div className="img-container">
						<img
							className="card-image"
							src={product.image}
							alt={product.name}
						/>
					</div>
				</div>
				<div className="card-info">
					<h3 className="card-title">{product.name}</h3>
					<div className="card-price">
					{product.discount > 0 && (<span className="original-price">${formatNumber(product.originalPrice)}</span>
					)}
					<br />
						<span className="discounted-price">${formatNumber(product.price)}</span>
					</div>
					<div className="card-buttons">
						<button
							className="btn card-btn"
							onClick={(e) => {
								e.stopPropagation();
								addProduct(product);
							}}>
							Añadir al carrito
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
