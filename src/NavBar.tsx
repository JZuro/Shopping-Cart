import { NavLink } from "react-router";
import { Home, Store, ShoppingCart } from "lucide-react";
import "./NavBar.css";


export default function NavBar() {
	return (
		<>
			<nav id="navBar">
				<NavLink to="/">
					<div className="flex flex-row justify-around items-bottom p-5 gap-2">
						<Home />
						<h2 className="mx-0">Home</h2>
					</div>
				</NavLink>
				<NavLink to="/shop">
					<div className="flex flex-row justify-around items-bottom p-5 gap-2">
						<Store />
						<h2 className="mx-0">Shop</h2>
					</div>
				</NavLink>
				<NavLink to="/cart">
					<div className="flex flex-row justify-around items-bottom p-5 gap-2">
						<ShoppingCart />
						<h2 className="mx-0">Cart</h2>
					</div>
				</NavLink>
			</nav>
		</>
	);
}
