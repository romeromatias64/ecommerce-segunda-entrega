import React, { useState } from "react";
import { useCart } from "../../components/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

export default function Cart({ removeProduct, }) {
	const { cart, total } = useCart();

    const { count, setCount} = useState([])



	return (
		<>
			<div className="cart-container">
				<table className="cart-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre</th>
							<th>Precio</th>
							<th>Cantidad</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{cart.length === 0 ? (
							<tr>
								<td colSpan="5" style={{ textAlign: "center" }}>
									<h2>El carrito está vacío</h2>
								</td>
							</tr>
						) : (
							cart.map((product) => (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>
										<div className="count-container">
											<button
												className="btn btn-count btn-minus" onClick={() => setCount((count) => (count -= 1))}>
												<FontAwesomeIcon icon={faMinus} />
											</button>
											{product.quantity}
											<button className="btn btn-count btn-plus" onClick={() => setCount((count) => (count += 1))}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
										</div>
									</td>

									<td>{product.price * product.quantity}</td>

									<td>
										<button
											className="btn btn-danger"
											onClick={() => removeProduct(product)}
											title="Eliminar producto">
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="5">TOTAL AR${total}</td>
						</tr>
					</tfoot>
				</table>

				<div className="cart-buttons">
					<button className="btn">Finalizar Compra</button>
					<button className="btn">Vaciar Carrito</button>
				</div>
			</div>
		</>
	);
}
