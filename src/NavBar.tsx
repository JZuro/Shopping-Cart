import { Link } from "react-router";
import { Home, Store, ShoppingCart } from "lucide-react";
import "./NavBar.css";

export default function NavBar() {
	return (
		<>
			<nav id="navBar">
				<Link to="/">
					<span className="nav">
						<Home />
						<h2>Home</h2>
					</span>
				</Link>
				<Link to="/Shop">
					<span className="nav">
						<Store />
						<h2>Shop</h2>
					</span>
				</Link>
				<Link to="/Cart">
					<span className="nav">
						<ShoppingCart />
						<h2>Cart</h2>
					</span>
				</Link>
			</nav>
		</>
	);
}
