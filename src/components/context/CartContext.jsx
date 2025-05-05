import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {

    const [ isOpen, setIsOpen ] = useState(false) // Estado para abrir y cerrar el carrito

    const [ count, setCount ] = useState(0) // Estado para contar la cantidad de productos en el carrito

    const [ total, setTotal ] = useState(0) // Estado para contar el total de la compra

    const [ cart, setCart ] = useState([]) // Estado para guardar los productos en el carrito


    // Inicializar el carrito desde localStorage al cargar la aplicación
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Guardar el carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


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

        console.log("producto recibido:", product)

        // Verificar si el producto ya está en el carrito
        const productInCart = cart.find((item) => item.id === product._id);

        if(!productInCart) {
            product.quantity = 1; // Si no está, le asigno la cantidad 1

            setCart([...cart, product]) // Agrego el producto al carrito
        } else {
            productInCart.quantity += 1; // Si ya está, incremento la cantidads

            setCart([...cart]) // Actualizo el carrito
        }
        Swal.fire({
            title: "Producto agregado al carrito",
            text: "Se agregó correctamente el producto al carrito.",
            icon: "success",
            theme: "dark",
            confirmButtonColor:"orange"
        })
    }

    // Funcion para eliminar productos del carrito
    function removeProduct(product) {
        const newCart = cart.filter((item) => item.id !== product.id)

        setCart(newCart)
    }

    // Funcion para incrementar la cantidad de un producto
    function increaseQuantity(id) {
        setCart((prodInCart) =>
            prodInCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    // Funcion para decrementar la cantidad de un producto
    function decreaseQuantity(id) {
        setCart((prodInCart) =>
            prodInCart.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    }

    function clearCart() {
        setCart([]) // Vaciamos el carrito
    }

    function formatNumber(value) {
		if (!value) return "";
		return new Intl.NumberFormat("es-AR", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	}

    return (
        <CartContext.Provider value={{ cart, isOpen, toggleCart, count, setCount, total, addProduct, removeProduct, increaseQuantity, decreaseQuantity, clearCart, formatNumber}}>
            {children}
        </CartContext.Provider>
    )


}