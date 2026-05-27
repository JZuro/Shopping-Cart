import { NavLink } from "react-router";
import { Home, Store, ShoppingCart } from "lucide-react";
import "./NavBar.css";


export default function NavBar() {
	return (
		<>
			<nav id="navBar" className="flex justify-evenly">
				<NavLink to="/">
					<div className="nav flex justify-center items-bottom p-5 gap-2 hover:underline underline-offset-10 hover:decoration-white">
						<Home />
						<h2>Home</h2>
					</div>
				</NavLink>
				<NavLink to="/shop">
					<div className="nav flex justify-center items-bottom p-5 gap-2 hover:underline underline-offset-10 hover:decoration-white">
						<Store />
						<h2>Shop</h2>
					</div>
				</NavLink>
				<NavLink to="/cart">
					<div className="nav flex justify-center items-bottom p-5 gap-2 hover:underline underline-offset-10 hover:decoration-white">
						<ShoppingCart />
						<h2>Cart</h2>
					</div>
				</NavLink>
			</nav>
		</>
	);
}
