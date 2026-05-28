import { NavLink } from "react-router";
import { Home, Store, ShoppingCart } from "lucide-react";
import "./NavBar.css";
import { useContext } from "react";
import { CartContext } from "./Contexts";

export default function NavBar() {
	const { cartItems } = useContext(CartContext);
	return (
		<>
				<nav id="navBar" className="flex">
				<ul className="flex flex-1 justify-evenly">
					<li className="text-xl font-medium nav group flex justify-center items-center p-5">
						<NavLink to="/" className="flex items-center gap-2">
							<Home className="block" />
							<span className="group-hover:underline underline-offset-10 decoration-white">Home</span>
						</NavLink>
					</li>
					<li className="text-xl font-medium nav group flex justify-center items-center p-5">
						<NavLink to="/shop" className="flex items-center gap-2">
							<Store className="block" />
							<span className="group-hover:underline underline-offset-10 decoration-white">Shop</span>
						</NavLink>
					</li>
					<li className="text-xl font-medium nav group flex justify-center items-center p-5">
						<NavLink to="/cart" className="flex items-center gap-2">
							<ShoppingCart className="block" />
							<span className="group-hover:underline underline-offset-10 decoration-white">Cart</span>
							<span id="counter" className="ml-3 border-3 rounded-sm h-8 w-6">
								{cartItems.length > 0 && `${cartItems.length}`}
							</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</>
	);
}
