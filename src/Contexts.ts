import { createContext } from "react";
import type { CartItem, ProductData } from "./types";

export const CartContext = createContext<{
	cartItems: CartItem[];
	addToCart: (item: ProductData | CartItem) => void;
	decreaseQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	priceTotal: number;
	itemsTotal: number;
}>({
	cartItems: [],
	addToCart: () => {},
	decreaseQuantity: () => {},
	removeFromCart: () => {},
	priceTotal: 0,
	itemsTotal: 0,
});
