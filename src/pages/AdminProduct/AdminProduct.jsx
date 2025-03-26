import React, { useEffect, useState } from "react";
import "./AdminProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const URL = "https://67cb83383395520e6af589cc.mockapi.io";

export default function AdminProduct({ products, setProducts }) {
	
	const {
		register,
		handleSubmit,
		setValue,
		setFocus,
		reset,
		formState: { errors, isValid },
	} = useForm();

	const [editProduct, setEditProduct] = useState(null);

	// useEffect(() => {
	// 	getProducts();
	// }, []);

	useEffect(() => {

		if(editProduct) {
			setValue("name", editProduct.name);
			setValue("description", editProduct.description);
			setValue("price", editProduct.price);
			setValue("image", editProduct.image);
		} else {
			reset()
		}
	}, [editProduct])

	

	async function addProduct(data) {
		try {
			if (editProduct) {
				const id = editProduct;

				const productToUpdate = {
					name: data.name,
					description: data.description,
					price: data.price,
					image: data.image,
				};

				const response = await axios.put(`${URL}/products/${id}`, productToUpdate);

				console.log(response.data)

				const productsCopy = [...products];
				const index = productsCopy.findIndex((product) => product.id === id);
				productsCopy[index] = response.data;

				setProducts(productsCopy);

				setEditProduct(null);
			} else {
				const newProduct = {
					name: data.name,
					description: data.description,
					price: data.price,
					image: data.image,
				};

				const response = await axios.post(`${URL}/products`, newProduct);

				setProducts([...products, response.data]);
				console.log(products)

				reset();

				Swal.fire(
					"Producto subido",
					"Se ha subido correctamente el producto",
					"success"
				)
			}

			setFocus("name")
		} catch (error) {
			console.log(error);
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
				reverseButtons: true
			}).then(async (result) => {
				if(result.isConfirmed) {
					await axios.delete(`${URL}/products/${id}`);

					const productsWithoutDeleted = products.filter((product) => product.id !== id);

					setProducts(productsWithoutDeleted);

					Swal.fire(
						"Producto eliminado",
						"el producto fue eliminado correctamente",
						"success"
					)
				}
			})
			} catch(error) {
				Swal.fire({
					title: "No se pudo borrar el producto",
					icon: "error",
				})
				console.error(error);
		}
	}

	return (
		<>
			<main className="main-admin-container">
				<form className="admin-form" onSubmit={handleSubmit(addProduct)}>
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
									message: "El nombre excede la capacidad de caracteres (50).",
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
						<textarea {...register("description")} id="description"></textarea>
					</div>
					<div className="input-group">
						<label htmlFor="price">Precio</label>
						<input type="number" {...register("price")} id="price" />
					</div>
					<div className="input-group">
						<label htmlFor="image">URL de la imagen del producto</label>
						<input type="url" {...register("image")} id="image" />
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
						<tbody>
							<tr>
								<td className="image-cell">
									<img src="https://i.imgur.com/BuYknWw.jpeg" alt="" className="table-image" />
								</td>
								<td className="name-cell">
									Fender American Professional II Stratocaster
								</td>
								<td className="description-cell">
									La American Professional II Stratocaster® HSS se basa en más
									de sesenta años de innovación, inspiración y evolución para
									satisfacer las demandas del guitarrista de hoy. ...
								</td>
								<td className="price-cell">
									<span className="descuento">$1.818.960</span> $1.622.315
								</td>
								<td className="tools-cell">
									<div className="icon-container">
										<button className="btn" title="Editar" onClick={() => updateProduct()}>
											<FontAwesomeIcon icon={faPencil} />
										</button>
										<button className="btn delete" title="Eliminar" onClick={() => deleteProduct()} >
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
}
