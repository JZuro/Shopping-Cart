import { useState, useEffect } from "react";
import type { productData } from "../types";

// Fetch products from the Fake Store API, 
// cache them in localStorage, and pre-warm image cache on load.

export default function useShopItems() {
	const [items, setItems] = useState<productData[] | null>(() => {
		const cached = localStorage.getItem("shopItems");
		const parsed = cached ? JSON.parse(cached) : null;
		return Array.isArray(parsed) ? parsed : null;
	});

	useEffect(() => {
		let ignore = false;
		const fetchItems = async () => {
			const r = await fetch("https://fakestoreapi.com/products");
			if (r.status >= 400) throw new Error(`${r.status}`);
			const result: productData[] = await r.json();
			localStorage.setItem("shopItems", JSON.stringify(result));
			if (!ignore) setItems(result);

			result.forEach((item) => {
				const img = new Image();
				img.src = item.image;
			});
		};

		fetchItems().catch((reason) => console.error(reason));

		return () => {
			ignore = true;
		};
	}, []);

	return items;
}
