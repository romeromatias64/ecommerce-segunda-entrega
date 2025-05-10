import { useCart } from "../../components/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import Swal from "sweetalert2";

export default function Cart() {
	const { cart, total, removeProduct, clearCart, increaseQuantity, decreaseQuantity, formatNumber } = useCart();

	


	return (
		<>
			<div className="cart-container">
				<div className="table-container">
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
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>{formatNumber(product.price)}</td>
										<td>
											<div className="count-container">
												<button
													className="btn btn-count btn-minus"
													onClick={() => decreaseQuantity(product._id)}>
													<FontAwesomeIcon icon={faMinus} />
												</button>
												{product.quantity}
												<button
													className="btn btn-count btn-plus"
													onClick={() => increaseQuantity(product._id)}>
													<FontAwesomeIcon icon={faPlus} />
												</button>
											</div>
										</td>

										<td>{formatNumber(product.price * product.quantity)}</td>

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
								<td colSpan="5">TOTAL AR${formatNumber(total)}</td>
							</tr>
						</tfoot>
					</table>
				</div>

				<div className="cart-buttons">
					<button className="btn">Finalizar Compra</button>
					<button
						className="btn"
						onClick={() => {
							Swal.fire({
								title: "¿Estás seguro?",
								text: "Esto vaciará todo el carrito. Esta acción no se puede deshacer.",
								icon: "warning",
								showCancelButton: true,
								confirmButtonColor: "#F00",
								cancelButtonColor: "#222",
								confirmButtonText: "Sí, vaciar carrito",
								cancelButtonText: "Cancelar",
								reverseButtons: true,
								theme: "dark"
							}).then((result) => {
								if (result.isConfirmed) {
									clearCart(); // Vacía el carrito si el usuario confirma
								}
							});
						}}>
						Vaciar Carrito
					</button>
				</div>
			</div>
		</>
	);
}
