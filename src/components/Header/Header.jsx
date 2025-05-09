import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {

	const { cart, toggleCart } = useCart()
	const { user } = useAuth()

	const defaultAvatar = "https://www.utqiagvik.us/wp-content/uploads/2022/08/pngwing.com_.png"

	return (
        <>
		<header className="main-header">
			<input type="checkbox" id="burger" className="input-burger" />
			{/* Menú hamburguesa */}
			<label className="burger-container" htmlFor="burger">
				<div className="burger" />
			</label>
			<div className="logo">
				<img
					className="nav-logo"
					src="https://i.imgur.com/oaxC4fQ.png"
					alt="Logo de la empresa"
				/>
			</div>
			<nav className="main-nav">
				<ul className="nav-list">
					<li className="nav-item">
						<NavLink to="/home" className={`nav-link ${({ isActive }) => isActive ? 'active' : ''}`}>
							INICIO
						</NavLink>
					</li>
					<li className="nav-item submenu-container">
						<p className="nav-link">GUITARRAS</p>
						<ul className="nav-list submenu">
							<li className="nav-item submenu-item">
								<a className="nav-link" href="">
									Fender
								</a>
							</li>
							<li className="nav-item submenu-item">
								<a className="nav-link" href="">
									Gibson
								</a>
							</li>
							<li className="nav-item submenu-item">
								<a className="nav-link" href="">
									Jackson
								</a>
							</li>
						</ul>
					</li>
					<li className="nav-item">
						<NavLink to="/contact" className="nav-link">
							CONTACTO
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/about" className="nav-link">
							ACERCA DE
						</NavLink>
					</li>
					<li className="nav-item submenu-container">
						<p className="nav-link">ADMINISTRAR</p>
						<ul className="nav-list submenu">
							<li className="nav-item submenu-item">
								<NavLink to="/admin-product" className="nav-link">
									PRODUCTOS
								</NavLink>
							</li>
							<li className="nav-item submenu-item">
								<NavLink to="/admin-user" className="nav-link">
									USUARIOS
								</NavLink>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
			<div className="user-info">
				<div className="cart-container">
					<div className="cart-icon" onClick={() => toggleCart()}>
						<FontAwesomeIcon icon={faShoppingCart} />
						<span className="cart-count">{cart.reduce((total, product) => total + product.quantity, 0)}</span>
					</div>
				</div>
				<div className="picture-container submenu-container">
					<img
						className="user-picture"
						src={ user?.avatar || defaultAvatar}
						alt={user ? user.name : "Invitado"}
					/>
					<ul className="nav-list submenu">
						<li className="nav-item submenu-item">
							<NavLink to="/register" className="nav-link">Registrarse</NavLink>
						</li>
						<li className="nav-item submenu-item">
							<NavLink to="/login" className="nav-link">Iniciar sesión</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</header>
        </>
	);
}
