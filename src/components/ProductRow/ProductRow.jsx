import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const URL = import.meta.env.VITE_API_URL;

export default function ProductRow({ product, updateProduct, deleteProduct, formatNumber }) {
	return (
		<>
			<tr>
				<td className="image-cell">
					<img
						src={URL + product.image.split("/")[product.image.split("/").length - 1]}
						alt={product.name}
						className="table-image"
					/>
				</td>
				<td className="name-cell">
					{product.name}
				</td>
				<td className="description-cell">
					{product.description}
				</td>
				<td className="price-cell">
					${formatNumber(product.price)}
				</td>
				<td className="tools-cell">
					<div className="icon-container">
						<button
							className="btn"
							title="Editar"
							onClick={() => updateProduct(product)}>
							<FontAwesomeIcon icon={faPencil} />
						</button>
						<button
							className="btn delete"
							title="Eliminar"
							onClick={() => deleteProduct(product.id)}>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				</td>
			</tr>
		</>
	);
}
