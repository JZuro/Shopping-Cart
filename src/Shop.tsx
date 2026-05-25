import { useEffect, useState } from "react";
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
	return fetch(`https://fakestoreapi.com/products/${itemID}`).then(
		(response) => response.json(),
	);
}
async function getAllItems(allItemsIDs: number[]): Promise<ProductProps[]> {
	return Promise.all(allItemsIDs.map((id) => getItem(id)));
}

const IDS_TO_RENDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Shop() {
	const [itemsToRender, setitemsToRender] = useState<ProductProps[] | null>(
		null,
	);

	function selectCategory(category: string): void {
		setitemsToRender(
			(previous) =>
				previous?.filter((item) => item.category === category) ?? null,
		);
	}

	useEffect(() => {
		let ignore = false;
		getAllItems(IDS_TO_RENDER).then((result) => {
			if (!ignore) {
				setitemsToRender(result);
			}
		});
		return () => {
			ignore = true;
		};
	}, []);

	return (
		<>
			<p>Shop</p>
			<button onClick={(e) => selectCategory(e.currentTarget.innerText)}>
				men's clothing
			</button>

			{itemsToRender?.map((item) => (
				<Product key={item.id} {...item} />
			))}
		</>
	);
}
