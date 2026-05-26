import { NavLink } from "react-router";
import { Home, Store, ShoppingCart } from "lucide-react";
import "./NavBar.css";


export default function NavBar() {
	return (
		<>
			<nav id="navBar" className="flex justify-evenly">
				<NavLink to="/">
					<div className="nav flex justify-center items-bottom p-5 gap-2 hover:bg-gray-700">
						<Home />
						<h2 className="mx-0">Home</h2>
					</div>
				</NavLink>
				<NavLink to="/shop">
					<div className="nav flex justify-center items-bottom p-5 gap-2 hover:bg-gray-700">
						<Store />
						<h2 className="mx-0">Shop</h2>
					</div>
				</NavLink>
				<NavLink to="/cart">
					<div className="nav flex justify-center items-bottom p-5 gap-2 hover:bg-gray-700">
						<ShoppingCart />
						<h2 className="mx-0">Cart</h2>
					</div>
				</NavLink>
			</nav>
		</>
	);
}
