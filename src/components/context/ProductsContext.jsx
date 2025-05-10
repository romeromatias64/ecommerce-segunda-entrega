import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

const URL = import.meta.env.VITE_API_URL;

export default function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const response = await axios.get(`${URL}/products`);
            console.log("Respuesta de la API: ", response.data)
            const products = response.data.products;

            setProducts(products);
        } catch (error) {
            console.log("Error al obtener los productos:", error);
            setProducts([]); // Establecer productos como vacío en caso de error
        }
    }

    return (
        <ProductsContext.Provider value={{ products, setProducts, getProducts }}>
            {children}
        </ProductsContext.Provider>
    );
}