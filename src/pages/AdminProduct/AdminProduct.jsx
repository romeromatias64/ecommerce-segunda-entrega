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
			const discount = data.discount || 0;
			const priceWithoutPoints = Number(data.price); // No se formatea aquí
			const discountedPrice =
				priceWithoutPoints - (priceWithoutPoints * discount) / 100; // Aplica el descuento

			if (editProduct) {
				const id = editProduct._id;

				const productToUpdate = {
					name: data.name,
					description: data.description,
					price: discountedPrice, // Precio sin formato
					originalPrice: priceWithoutPoints, // Precio original sin formateo
					discount: discount, // Porcentaje de descuento
					image: data.image,
				};

				const response = await axios.put(
					`${URL}/products/${id}`,
					productToUpdate
				);

				const productsCopy = [...products];
				const index = productsCopy.findIndex((product) => product.id === id);
				productsCopy[index] = response.data;

				setProducts(productsCopy);

				setEditProduct(null);

				Swal.fire({
					title: "Producto actualizado",
					text: "El producto se actualizó correctamente",
					icon: "success",
					theme: "dark"
				}
				);
			} else {
				const newProduct = {
					name: data.name,
					description: data.description,
					price: discountedPrice, // Precio sin formato
					originalPrice: priceWithoutPoints, // Precio original sin formateo
					discount: discount, // Porcentaje de descuento
					image: data.image,
				};

				const response = await axios.post(`${URL}/products`, newProduct);

				setProducts([...products, response.data]);

				reset(); // Resetea el formulario

				Swal.fire({
					title: "Producto subido",
					text: "Se ha subido correctamente el producto",
					icon: "success",
					theme: "dark"
				}
				);
			}

			setFocus("name");
		} catch (error) {
			console.error(error);

			Swal.fire( {
				title: "Error",
				text: "Hubo un problema al agregar o actualizar el producto",
				icon: "error",
				theme: "dark"
			}
			);
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
				theme: "dark"
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
						theme: "dark"
					}
					);
				}
			});
		} catch (error) {
			Swal.fire({
				title: "No se pudo borrar el producto",
				icon: "error",
				theme: "dark"
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
									message: "La descripción excede el límite de 1500 caracteres.",
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
							{...register("discount", {
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
							id="discount"
							placeholder="Ingrese el porcentaje de descuento"
						/>
						{errors.discount && (
							<span className="error">{errors.discount.message}</span>
						)}
					</div>

					<div className="input-group">
						<label htmlFor="image">Imagen</label>
						<input type="file" accept="image/*" {...register("image", {
							required:"Se requiere la imagen del producto"
						})} 
						placeholder="Pegue el url de la imagen"	
					/>
					</div>

					<div className="input-group">
						<label htmlFor="category">Categoría</label>
						<select id="category" {...register("category", {
							required: "El producto debe tener una categoría",
							validate: (value) => {
								if (value === "default") {
									return "Seleccione una categoría válida.";
								}
								return true;
							},
						})}>
							<option value="default" disabled>Seleccione una categoría</option>
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
