import { CartContext } from "./Contexts";
import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { ProductData, CartItem } from "./types";

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		const cached = localStorage.getItem("cartItems");
		return cached ? JSON.parse(cached) : [];
	});
	const isMounted = useRef(false);
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	const removeFromCart = (id: number) => setCartItems((prev) => prev.filter((i) => i.id !== id));

	const decreaseQuantity = (id: number) => {
		setCartItems((prev) => {
			const item = prev.find((i) => i.id === id);
			if (!item) return prev;
			if (item.quantity === 1) return prev.filter((i) => i.id !== id);
			return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
		});
	};

	const addToCart = (item: ProductData) => {
		setCartItems((prev) => {
			const itemExists = prev.find((i) => i.id === item.id);
			if (itemExists) {
				return prev.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
				);
			}
            return [...prev, { ...item, quantity: 1 }];
		});
	};

	const priceTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const itemsTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, priceTotal, itemsTotal }}>
			{children}
		</CartContext.Provider>
	);
}
