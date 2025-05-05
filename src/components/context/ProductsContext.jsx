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
            const products = response.data.products;

            const productsWithFullImagePath = products.map(product => ({
                ...product,
                image: product.image ? `${URL}/${product.image.replace(/\\/g, '/')}` : null,
            }));
            
            setProducts(productsWithFullImagePath);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProductsContext.Provider value={{ products, setProducts, getProducts }}>
            {children}
        </ProductsContext.Provider>
    );
}