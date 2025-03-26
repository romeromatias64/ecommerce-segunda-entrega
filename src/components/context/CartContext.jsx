import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {

    const [ isOpen, setIsOpen ] = useState(false) // Estado para abrir y cerrar el carrito

    const [ count, setCount ] = useState(0) // Estado para contar la cantidad de productos en el carrito

    const [ total, setTotal ] = useState(0) // Estado para contar el total de la compra

    const [ cart, setCart ] = useState([]) // Estado para guardar los productos en el carrito


    useEffect(() => {

        let contador = 0;
        let total = 0;

        cart.forEach((product) => {
            contador += product.quantity;
            total += product.price * product.quantity;
        })

        setCount(contador);
        setTotal(total);
    }, [cart])

    // Funcion para abrir y cerrar el carrito
    function toggleCart() {

        setIsOpen(!isOpen);
    }

    // Funcion para agregar productos al carrito
    function addProduct(product) {

        // Verificar si el producto ya está en el carrito
        const productInCart = cart.find((item) => item.id === product.id);

        if(!productInCart) {
            product.quantity = 1; // Si no está, le asigno la cantidad 1

            setCart([...cart, product]) // Agrego el producto al carrito
        } else {
            productInCart.quantity += 1; // Si ya está, incremento la cantidads

            setCart([...cart]) // Actualizo el carrito
        }
    }

    // Funcion para eliminar productos del carrito
    function removeProduct(product) {
        const newCart = cart.filter((item) => item.id !== product.id)

        setCart(newCart)
    }

    // Funcion para decrementar la cantidad de un producto
    function decreaseQuantity(product) {
        const productInCart = cart.find((item) => item.id === product.id)

        if(productInCart.quantity > 1) {
            productInCart.quantity -= 1;
            setCart([...cart])
        }
    }

    return (
        <CartContext.Provider value={{ cart, isOpen, toggleCart, count, setCount, total, addProduct, removeProduct, decreaseQuantity}}>
            {children}
        </CartContext.Provider>
    )


}