import { useEffect, useState, useMemo } from "react";
import Product from "./components/Product";

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

async function getItem(itemID: number): Promise<ProductProps> {
	return fetch(`https://fakestoreapi.com/products/${itemID}`).then((response) =>
		response.json(),
	);
}

async function getAllItems(allItemsIDs: number[]): Promise<ProductProps[]> {
	return Promise.all(allItemsIDs.map((id) => getItem(id)));
}

const IDS_TO_RENDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Shop() {
	const [items, setItems] = useState<ProductProps[] | null>(null);
	useEffect(() => {
		let ignore = false;
		getAllItems(IDS_TO_RENDER).then((result) => {
			if (!ignore) {
				setItems(result);
			}
		});
		return () => {
			ignore = true;
		};
	}, []);

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const itemsToRender = useMemo(
		() => (selectedCategory ? (items?.filter((item) => item.category === selectedCategory) ?? null) : items),
		[items, selectedCategory],
	);

	function selectCategory(category: string): void {
		setSelectedCategory(category);
	}

	const ITEM_CATEGORIES = Array.from(
		new Set(items?.map((item) => item.category)),
	);

	return (
		<>
			<div className="flex flex-row justify-around">
				{ITEM_CATEGORIES.map((category) => (
					<div key={category}>
						<button onClick={(e) => selectCategory(e.currentTarget.innerText)}>
							{category}
						</button>
					</div>
				))}
			</div>

			<div className="products p-15 grid grid-cols-3 gap-10">
				{itemsToRender?.map((item) => (
					<Product key={item.id} {...item} />
				))}
			</div>
		</>
	);
}
