import { useCart } from "../../components/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import Swal from "sweetalert2";
import { useAuth } from "../../components/context/AuthContext";
import axios from "axios";

export default function Cart() {
	const { cart, total, removeProduct, clearCart, increaseQuantity, decreaseQuantity, formatNumber } = useCart();

	const { user, logout } = useAuth(); // Obtener usuario y token

// Función para crear la orden
async function handleCheckout() {
    try {
        if (!user || !user._id) {
            Swal.fire({
                title: "Acceso requerido",
                text: "Debes iniciar sesión para finalizar la compra",
                icon: "warning",
                confirmButtonColor: "orange",
                theme: "dark"
            });
            return;
        }

        // Preparar datos de la orden
        const orderData = {
            user: user._id,
            products: cart.map(product => ({
                product: product._id,
                quantity: product.quantity,
                price: product.price
            })),
            total: total
        };

        // Obtener el token (desde localStorage o sessionStorage)
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
		if(!token) {
			logout();
			throw new Error("Token no encontrado");
		}

        // Enviar solicitud al backend
        const { data } = await axios.post("/api/orders", orderData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

		if(!data.order || !data.order._id) {
			throw new Error("La orden no se creó correctamente");
		}

        // Éxito: Mostrar confirmación y vaciar carrito
        Swal.fire({
            title: "¡Orden creada!",
            text: `ID de orden: ${data.order._id}`,
            icon: "success",
            confirmButtonColor: "orange",
            theme: "dark"
        });
        clearCart();

        const ordersResponse = await axios.get("/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        console.log("Órdenes actualizadas:", ordersResponse.data);

    } catch (error) {
        const message = error.response?.data?.message || "Error al crear la orden";
        Swal.fire({
            title: "Error",
            text: message,
            icon: "error"
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
					<button className="btn" onClick={handleCheckout}>Finalizar Compra</button>
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
