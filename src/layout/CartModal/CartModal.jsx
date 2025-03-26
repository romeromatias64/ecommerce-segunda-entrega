import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCart } from '../../components/context/CartContext';
import Cart from '../../pages/Cart/Cart';
import './CartModal.css';
import React from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function CartModal() {
    const { isOpen, toggleCart } = useCart();

    if(!isOpen) return;

    return (
        
        <div className='modal-overlay' onClick={() => toggleCart()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="subtitle">Mi carrito</h2>
                    <button className='btn btn-danger' onClick={() => toggleCart()}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
                <div className="modal-body">
                    <Cart />
                </div>
            </div>
        </div>
    )
}
