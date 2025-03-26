import { Route, Routes } from "react-router";
import "./App.css";
import Main from "./pages/Main/Main";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import AdminProduct from "./pages/AdminProduct/AdminProduct";


function App() {
	return (
		<>
			<Routes>
				<Route path="/register" element={<h1>register</h1>} />

				<Route path="/" element={<Main />}>

					<Route path="/home" element={<Home />} />

					<Route path="/contact" element={<Contact />} />

					<Route path="/about" element={<h1>About</h1>} />

					<Route path="/admin-product" element={<AdminProduct />} />

				</Route>
			</Routes>
		</>
	);
}

export default App;
