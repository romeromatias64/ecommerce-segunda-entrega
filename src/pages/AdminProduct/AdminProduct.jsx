import React, { useEffect, useState } from "react";
import "./AdminProduct.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import ProductRow from "../../components/ProductRow/ProductRow";

const URL = import.meta.env.VITE_API_URL;

export default function AdminProduct() {
	const [products, setProducts] = useState([]);
	const [editProduct, setEditProduct] = useState(null);

	useEffect(() => {
		getProducts();
	}, []);

	async function getProducts() {
		try {
			const response = await axios.get(`${URL}/products`);
			const data = response.data.products;

			setProducts(data);
		} catch (error) {
			console.log("Error al obtener los productos: ", error);
		}
	}

	const {
		register,
		handleSubmit,
		setValue,
		setFocus,
		reset,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange", // Valida mientras escribe el usuario
	});

	useEffect(() => {
		if (editProduct) {
			setValue("name", editProduct.name);
			setValue("description", editProduct.description);
			setValue("price", editProduct.price);
			setValue("discount", editProduct.discount);
			setValue("image", editProduct.image);
		} else {
			reset();
		}

		document.getElementById("form").scrollIntoView({ behavior: "smooth" });
	}, [editProduct]);

	async function addProduct(data) {
		try {
			const formData = new FormData();

			// Calcular precios y descuento
			const originalPrice = Number(data.price);
			const discountPercentage = Number(data.discountPercentage) || 0;
			const discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100;

			// Agregar campos al FormData
			formData.append("name", data.name);
			formData.append("description", data.description);
			formData.append("originalPrice", originalPrice); // Precio original sin descuento
			formData.append("discountPercentage", discountPercentage); // % de descuento
			formData.append("price", discountedPrice); // Precio final con descuento
			formData.append("category", data.category);

			// Manejo de la imagen
			if (data.image[0]) {
				formData.append("image", data.image[0]);
			} else if (editProduct) {
				// Si estamos editando y no hay nueva imagen, mantener la existente
				formData.append("image", editProduct.image);
			}

			// Enviar datos al backend
			let response;
			if (editProduct) {
				// Actualizar producto existente
				response = await axios.put(
					`${URL}/products/${editProduct._id}`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
			} else {
				// Crear nuevo producto
				response = await axios.post(`${URL}/products`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
			}

			// Actualizar estado de productos
			if (editProduct) {
				const updatedProducts = products.map((product) =>
					product._id === editProduct._id ? response.data.product : product
				);
				setProducts(updatedProducts);
			} else {
				setProducts([...products, response.data.product]);
			}

			// Resetear formulario y mostrar feedback
			reset();
			setEditProduct(null);
			Swal.fire({
				title: editProduct ? "¡Actualizado!" : "¡Creado!",
				text: editProduct
					? "El producto se actualizó correctamente"
					: "Nuevo producto agregado",
				icon: "success",
				theme: "dark",
			});

			// Enfocar el campo "name" después de enviar
			setFocus("name");
		} catch (error) {
			console.error("Error al guardar:", error);

			// Mensaje de error detallado
			const errorMessage =
				error.response?.data?.message || "Error al comunicarse con el servidor";

			Swal.fire({
				title: "Error",
				text: errorMessage,
				icon: "error",
				theme: "dark",
			});
		}
	}

	async function updateProduct(product) {
		setEditProduct(product);
	}

	function deleteProduct(id) {
		try {
			Swal.fire({
				title: "¿Seguro que quieres eliminar este producto?",
				text: "No volverá a estar disponible.",
				icon: "warning",
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonText: "Eliminar",
				confirmButtonColor: "#F00",
				cancelButtonColor: "#ccc",
				reverseButtons: true,
				theme: "dark",
			}).then(async (result) => {
				if (result.isConfirmed) {
					await axios.delete(`${URL}/products/${id}`);

					const productsWithoutDeleted = products.filter(
						(product) => product._id !== id
					);

					setProducts(productsWithoutDeleted);

					Swal.fire({
						title: "Producto eliminado",
						text: "El producto fue eliminado correctamente",
						icon: "success",
						theme: "dark",
					});
				}
			});
		} catch (error) {
			Swal.fire({
				title: "No se pudo borrar el producto",
				icon: "error",
				theme: "dark",
			});
			console.error(error);
		}
	}

	function formatNumber(value) {
		if (!value) return "";
		return new Intl.NumberFormat("es-AR", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	}

	return (
		<>
			<main className="main-admin-container">
				<h1 className="title">Agregar un producto</h1>
				<form
					className="admin-form"
					id="form"
					onSubmit={handleSubmit(addProduct)}>
					<div className="input-group">
						<label htmlFor="name">Nombre del producto</label>
						<input
							type="text"
							{...register("name", {
								required: "Se requiere el nombre del producto.",
								minLength: {
									value: 6,
									message: "El nombre debe tener al menos 6 caracteres.",
								},
								maxLength: {
									value: 50,
									message: "El nombre excede el límite de 50 caracteres.",
								},
							})}
							id="name"
							placeholder="Escriba el nombre del producto"
						/>
						{errors.name && (
							<span className="error">{errors.name.message}</span>
						)}
					</div>

					<div className="input-group">
						<label htmlFor="description">Descripción</label>
						<textarea
							className="description"
							{...register("description", {
								required: "Se requiere la descripción del producto.",
								minLength: {
									value: 30,
									message: "La descripción debe tener al menos 30 caracteres.",
								},
								maxLength: {
									value: 1500,
									message:
										"La descripción excede el límite de 1500 caracteres.",
								},
							})}
							id="description"
							placeholder="Escriba una descripción del producto"
						/>
						{errors.description && (
							<span className="error">{errors.description.message}</span>
						)}
					</div>

					<div className="input-group">
						<label htmlFor="price">Precio</label>
						<input
							type="number"
							{...register("price", {
								required: "Se requiere el precio del producto.",
								validate: (value) => {
									if (!/^\d+$/.test(value)) {
										return "El precio debe ser un número válido.";
									}
									return true;
								},
							})}
							id="price"
							placeholder="Ingrese el precio del producto"
						/>
						{errors.price && (
							<span className="error">{errors.price.message}</span>
						)}
					</div>
					<div className="input-group">
						<label htmlFor="discount">Descuento (%)</label>
						<input
							type="number"
							{...register("discountPercentage", {
								required: "Se requiere el descuento.",
								min: {
									value: 0,
									message: "El descuento no puede ser menor a 0.",
								},
								max: {
									value: 100,
									message: "El descuento no puede ser mayor a 100.",
								},
							})}
							id="discountPercentage"
							placeholder="Ingrese el porcentaje de descuento"
						/>
						{errors.discountPercentage && (
							<span className="error">{errors.discountPercentage.message}</span>
						)}
					</div>

					<div className="input-group">
						<label htmlFor="image">Imagen</label>
						<input
							type="file"
							accept="image/*"
							{...register("image", {
								required:
									!editProduct && "Se requiere una imagen para el producto.", // Solo requerido si no se está editando
							})}
							placeholder="Pegue el url de la imagen"
						/>
					</div>

					<div className="input-group">
						<label htmlFor="category">Categoría</label>
						<select
							id="category"
							{...register("category", {
								required: "El producto debe tener una categoría",
								validate: (value) => {
									if (value === "default") {
										return "Seleccione una categoría válida.";
									}
									return true;
								},
							})}>
							<option value="default" disabled>
								Seleccione una categoría
							</option>
							<option value="fender">Fender</option>
							<option value="gibson">Gibson</option>
							<option value="jackson">Jackson</option>
						</select>
					</div>
					<button className="button" type="submit" disabled={!isValid}>
						{editProduct ? "Actualizar Producto" : "Publicar Producto"}
					</button>
				</form>

				<div className="table-responsive">
					<table border={1} className="admin-table">
						<thead>
							<tr>
								<th>IMAGEN</th>
								<th>PRODUCTO</th>
								<th>DESCRIPCIÓN</th>
								<th>PRECIO</th>
							</tr>
						</thead>
						<tbody className="product-rows">
							{products.map((product) => (
								<ProductRow
									key={product._id}
									product={product}
									updateProduct={updateProduct}
									deleteProduct={deleteProduct}
									formatNumber={formatNumber}
								/>
							))}
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
}
