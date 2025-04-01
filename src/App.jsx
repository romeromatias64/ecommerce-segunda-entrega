import { Route, Routes } from "react-router";
import "./App.css";
import Main from "./components/Main/Main";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import AdminProduct from "./pages/AdminProduct/AdminProduct";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import ProductDetail from "./pages/ProductDetail/ProductDetail";


function App() {
	return (
		<>
			<Routes>
				<Route path="/register" element={<Register />} />

				<Route path="/" element={<Main />}>

					<Route path="/home" element={<Home />} />

					<Route path="/product-detail" element={<ProductDetail />} />

					<Route path="/contact" element={<Contact />} />

					<Route path="/about" element={<About />} />

					<Route path="/admin-product" element={<AdminProduct />} />

					<Route path="/admin-user" element={<h2>Administrador de usuarios</h2>} />

				</Route>
			</Routes>
		</>
	);
}

export default App;
