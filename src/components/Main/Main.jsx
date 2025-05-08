import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../../App.css'
import '../../pages/Home/Home.css'
import CartModal from "../../layout/CartModal/CartModal";


export default function Main() {
	return (
		<>
            <Header />

            <CartModal/>

            <main className="main-container">
                <Outlet />
            </main>

            <Footer />
		</>
	);
}
