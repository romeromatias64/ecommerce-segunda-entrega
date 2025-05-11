import { useCart } from "../../components/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import Swal from "sweetalert2";
import { useAuth } from "../../components/context/AuthContext";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export default function Cart() {
	const {
		cart,
		total,
		removeProduct,
		clearCart,
		increaseQuantity,
		decreaseQuantity,
		formatNumber,
	} = useCart();
	const { user, logout } = useAuth();

	// Función para crear la orden
	async function handleCheckout() {
		try {
			// Validar _id antes de enviar
			const invalidProducts = cart.filter(
				(product) => !/^[0-9a-fA-F]{24}$/.test(product._id)
			);

			if (invalidProducts.length > 0) {
				throw new Error("Algunos productos tienen ID inválido");
			}

			if (!user || !user._id) {
				Swal.fire({
					title: "Acceso requerido",
					text: "Debes iniciar sesión para finalizar la compra",
					icon: "warning",
					confirmButtonColor: "orange",
					theme: "dark",
				});
				return;
			}

			console.log("Contenido del carrito:", cart);

			// Preparar datos de la orden
			const orderData = {
				user: user._id,
				products: cart.map((product) => ({
					product: product._id,
					quantity: product.quantity,
					price: product.price,
				})),
				total: total,
			};

			console.log("Datos de la orden:", orderData);

			// Obtener el token
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");
			if (!token) {
				logout();
				throw new Error("Token no encontrado");
			}

			if (cart.length === 0) {
				Swal.fire({
					title: "Carrito vacío",
					text: "No puedes finalizar la compra con un carrito vacío.",
					icon: "warning",
					confirmButtonColor: "orange",
					theme: "dark",
				});
				return;
			}

			if (total <= 0) {
				Swal.fire({
					title: "Total inválido",
					text: "El total de la orden debe ser mayor a 0.",
					icon: "warning",
					confirmButtonColor: "orange",
					theme: "dark",
				});
				return;
			}

			// Enviar solicitud al backend
			const response = await axios.post(`${URL}/orders`, orderData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			console.log("Respuesta del backend:", response.data);

			if(!response.data.order?._id) {
				throw new Error("La orden no se creó correctamente");
			}

			// Verificar si la respuesta es un error inesperado
			if (response.status !== 201) {
				throw new Error(`Error inesperado: ${response.status}`);
			}

			// Mostrar confirmación
			Swal.fire({
				title: "¡Orden creada!",
				text: `Orden #${response.data.order._id} creada`,
				icon: "success",
				confirmButtonColor: "orange",
				theme: "dark",
			});

			clearCart();

			const ordersResponse = await axios.get(`${URL}/orders`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("Órdenes actualizadas:", ordersResponse.data);
		} catch (error) {
			// Manejar errores específicos del backend o de red
			const errorMessage = error.response?.data?.message || error.message;

			Swal.fire({
				title: "Error",
				text: errorMessage,
				icon: "error",
				theme: "dark",
			});

			// Cerrar sesión si el token es inválido
			if (error.response?.status === 401) logout();
		}
	}

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
					<button className="btn" onClick={handleCheckout}>
						Finalizar Compra
					</button>
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
								theme: "dark",
							}).then((result) => {
								if (result.isConfirmed) {
									clearCart();
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
