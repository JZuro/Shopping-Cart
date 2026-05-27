import { useEffect, useState, useMemo } from "react";
import Product from "./components/Product";
import "./components/styles/Shop.css";

// --- Types ---

interface ProductProps {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}

// --- Config ---

const IDS_TO_RENDER = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];

// --- Hook ---

function useShopItems() {
	const [items, setItems] = useState<ProductProps[] | null>(null);

	useEffect(() => {
		let ignore = false;

		const fetchItems = async () => {
			const responses = await Promise.all(
				IDS_TO_RENDER.map((id) =>
					fetch(`https://fakestoreapi.com/products/${id}`).then((r) => {
						if (r.status >= 400) {
							throw new Error(`${r.status}`);
						} else {
							return r.json();
						}
					}),
				),
			);

			if (!ignore) setItems(responses);
		};

		fetchItems().catch((error) => {
            console.error(error);
            if (!ignore) setItems([])});
		return () => {
			ignore = true;
		};
	}, []);

	return items;
}

// --- Component ---

export default function Shop() {
	const items = useShopItems();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const itemsToRender = useMemo(
		() =>
			selectedCategory
				? (items?.filter((item) => item.category === selectedCategory) ?? null)
				: items,
		[items, selectedCategory],
	);

	const ITEM_CATEGORIES = Array.from(
		new Set(items?.map((item) => item.category)),
	).toSorted();

	if (!items) return <div>Loading...</div>;

	return (
		<>
			{/* CATEGORIES */}
			<div
				id="categories"
				className="flex flex-col md:flex-row text-xl md:text-base mt-5 p-1 justify-around align-center md:gap-10"
			>
				<div key="all" className="category hover:text-gray-100">
					<button onClick={() => setSelectedCategory(null)}>All</button>
				</div>
				{ITEM_CATEGORIES.map((category) => (
					<div key={category} className="category hover:text-gray-100">
						<button onClick={() => setSelectedCategory(category)}>
							{category[0].toUpperCase() + category.slice(1)}
						</button>
					</div>
				))}
			</div>
			{/* RENDERED PRODUCTS */}
			<div className="products p-15 grid grid-cols-1 gap-10 md:grid-cols-3">
				{itemsToRender?.map((item) => (
					<Product key={item.id} {...item} />
				))}
			</div>
		</>
	);
}
