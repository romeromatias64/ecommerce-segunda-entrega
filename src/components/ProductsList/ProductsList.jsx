// ProductsList.js
import React, { useEffect } from "react";
import Product from "../Product/Product";
import { useProducts } from "../context/ProductsContext";

export default function ProductsList() {

    const { products, getProducts } = useProducts();
    
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="product-list">
            {products && products.length > 0 ? (
                products.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            ) : (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
}