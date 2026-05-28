import { createContext } from "react";
import type { ProductData } from "./types";

export const CartContext = createContext<{
	cartItems: ProductData[];
	addToCart: (item: ProductData) => void;
}>({ cartItems: [], addToCart: () => {} });

