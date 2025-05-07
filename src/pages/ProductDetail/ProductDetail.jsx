import React from "react";
import "./ProductDetail.css";
import { useCart } from "../../components/context/CartContext";
import { useLocation } from "react-router";

const URL = import.meta.env.VITE_API_URL;

export default function ProductDetail() {
	const { addProduct } = useCart();
	const location = useLocation();
    const product = location.state?.product; // Obtén el producto del estado

    if (!product) {
        return <p>No se encontró el producto.</p>;
    }

	function formatNumber(value) {
		if (!value) return "";
		return new Intl.NumberFormat("es-AR", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	}

	console.log(product)

	return (
		<>
			<main className="main-container main-detail-container">
				<section className="product-sect sect">
					<div className="detail">
						<img
							className="image"
							src={`${URL}/uploads/products/` + product.image.split("/")[product.image.split("/").length - 1]}
							alt={product.name}
						/>
						<div className="detail-content">
							<h1 className="detail-title">
								{product.name}
							</h1>
							<div className="detail-text">
								{product.description}
							</div>
							<div className="detail-price">
							{product.discount > 0 && (<span className="original-price">${formatNumber(product.originalPrice)}</span>)}
							<br />
							<span className="discounted-price">${formatNumber(product.price)}</span>
							</div>
							<button className="detail-btn btn" onClick={() => addProduct(product)}>Añadir al carrito</button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
