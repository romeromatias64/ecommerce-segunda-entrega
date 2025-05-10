import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Product.css";
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL;

export default function Product({ product }) {
	const { addProduct } = useCart();
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		console.log("URL de la imagen: ", product.image);
		const img = new Image();
		img.src = product.image; // URL directa de S3
		img.onload = () => setImageLoaded(true);
	}, [product.image]);

	function formatNumber(value) {
		if (!value) return "";
		return new Intl.NumberFormat("es-AR", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	}

	return (
		<>
			<div className="card" key={product._id}>
				<div style={{ display: imageLoaded ? "block" : "none" }}>
					{product.discountPercentage > 0 && (
						<span className="card-status sale">
							-{product.discountPercentage}%
						</span>
					)}
				</div>
				<Link to="/product-detail" className="card-link" state={{ product }} />
				<div className="card-content">
					<div className="img-container">
						{!imageLoaded && (
							<div className="skeleton-loader">
								<div className="skeleton-image"></div>
								<div className="skeleton-text"></div>
								<div className="skeleton-text-short"></div>
							</div>
						)}
						<img
							className="card-image"
							src={product.image}
							alt={product.name}
							onLoad={() => setImageLoaded(true)}
						/>
					</div>
				</div>
				<div className="card-info">
					<h3 className="card-title">{product.name}</h3>
					<div className="card-price">
						{product.discountPercentage > 0 && (
							<span className="original-price">
								${formatNumber(product.originalPrice)}
							</span>
						)}
						<br />
						<span className="discounted-price">
							${formatNumber(product.price)}
						</span>
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
