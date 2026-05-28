import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { CartProvider } from "./CartProvider";

export default function Layout() {
	return (
		<CartProvider>
			<NavBar />
			<Outlet />
		</CartProvider>
	);
}
