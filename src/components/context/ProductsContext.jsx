import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

const URL = "https://67cb83383395520e6af589cc.mockapi.io";

export default function ProductsProvider({ children }) { 

    const [products, setProducts] = useState([]);

    useEffect(() => {
            getProducts();
    }, []);

    async function getProducts() {
		try {
			const response = await axios.get(`${URL}/products`);

			setProducts(response.data);

		} catch (error) {
			console.log(error);
		}
	}

    

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}
