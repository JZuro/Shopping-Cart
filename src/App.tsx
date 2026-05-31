import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import { CartProvider } from "./context/CartProvider";

export default function App() {
	return (
		<CartProvider>
			<NavBar />
			<Outlet />
		</CartProvider>
	);
}
