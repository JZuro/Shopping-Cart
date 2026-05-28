import { CartContext } from "./Contexts";
import { useState } from "react";
import type { ReactNode } from "react";
import type { ProductData } from "./types";

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<ProductData[]>([]);
	const addToCart = (item: ProductData) => setCartItems((prev) => [...prev, item]);

	return (
		<CartContext.Provider value={{ cartItems, addToCart }}>
			{children}
		</CartContext.Provider>
	);
}
