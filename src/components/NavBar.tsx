import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Home, Store, ShoppingCart, Menu, X as XIcon, Sun, Moon } from "lucide-react";
import "./NavBar.css";
import { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";

export default function NavBar() {
	const cartItems = useContext(CartContext);
	const [menuOpen, setMenuOpen] = useState(false);
	const [dark, setDark] = useState<boolean>(() => {
		const stored = localStorage.getItem("theme");
		if (stored === "dark") return true;
		if (stored === "light") return false;
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		document.documentElement.dataset.theme = dark ? "dark" : "light";
		localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);

	return (
		<nav id="navBar">
			<div className="flex flex-col md:flex-row shadow-md text-(--text-h)">
				<div className="flex items-stretch justify-between md:contents">
					<Link
						to="/"
						className="bg-(--logo-bg) text-(--logo) p-6 text-xl font-medium md:order-1"
						onClick={() => setMenuOpen(false)}
					>
						<b>Lorem</b>|Ipsum
					</Link>
					<div className="flex items-center md:order-3">
						<button
							className="p-5"
							onClick={() => setDark((d) => !d)}
							aria-label="Toggle color scheme"
						>
							{dark ? <Sun size={18} /> : <Moon size={18} />}
						</button>
						<button
							className="md:hidden p-5"
							onClick={() => setMenuOpen((o) => !o)}
							aria-label="Toggle navigation"
						>
							{menuOpen ? <XIcon /> : <Menu />}
						</button>
					</div>
				</div>

				<ul className={`${menuOpen ? "flex" : "hidden"} md:flex md:order-2 flex-col md:flex-row flex-1 justify-around`}>
					<li className="text-lg font-medium flex justify-center items-center p-5">
						<NavLink to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
							<Home />
							<span className="hover:underline underline-offset-10">Home</span>
						</NavLink>
					</li>
					<li className="text-lg font-medium flex justify-center items-center p-5">
						<NavLink to="/shop" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
							<Store />
							<span className="hover:underline underline-offset-10">Shop</span>
						</NavLink>
					</li>
					<li className="text-lg font-medium flex justify-center items-center p-5">
						<NavLink to="/cart" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
							<ShoppingCart />
							<span className="hover:underline underline-offset-10">Cart</span>
							<span
								id="counter"
								className={`text-(--text) ml-3 border-2 border-(--border) rounded-sm h-8 w-6 ${cartItems.itemsTotal === 0 && "opacity-0"}`}
							>
								{cartItems.itemsTotal}
							</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}
