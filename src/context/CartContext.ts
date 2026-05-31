import { createContext } from "react";
import type { cartItemData, productData } from "../types";

export const CartContext = createContext<{
	cartItems: cartItemData[];
	addToCart: (item: productData | cartItemData) => void;
	decreaseQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	priceTotal: number;
	itemsTotal: number;
	clearCart: () => void;
}>({
	cartItems: [],
	addToCart: () => {},
	decreaseQuantity: () => {},
	removeFromCart: () => {},
	priceTotal: 0,
	itemsTotal: 0,
	clearCart: () => {},
});
