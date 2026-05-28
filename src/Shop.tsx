import { useEffect, useState, useMemo, useContext } from "react";
import type { ProductData } from "./types";
import ProductCard from "./components/Product";
import "./components/styles/Shop.css";
import { CartContext } from "./Contexts";


// --- Hook ---

function useShopItems() {
	const [items, setItems] = useState<ProductData[] | null>(() => {
		const cached = localStorage.getItem("shopItems");
		return cached ? JSON.parse(cached) : null;
	});

	useEffect(() => {
		let ignore = false;

		const fetchItems = async () => {
			const r = await fetch("https://fakestoreapi.com/products");
			if (r.status >= 400) throw new Error(`${r.status}`);
			const result: ProductData[] = await r.json();
			localStorage.setItem("shopItems", JSON.stringify(result));
			if (!ignore) setItems(result);
		};

		fetchItems().catch((reason) => console.error(reason));

		return () => {
			ignore = true;
		};
	}, []);

	return items;
}

// --- ProductDetails ---

function ProductDetails({
	product,
	setSelectedProduct,
}: {
	product: ProductData | null;
	setSelectedProduct: (p: ProductData | null) => void;
}): React.ReactElement {
	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
			onClick={() => setSelectedProduct(null)}
		>
			<div
				className="bg-white text-black rounded-xl p-8 max-w-lg w-full mx-4 flex flex-col gap-4"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="self-end text-gray-500 hover:text-black"
					onClick={() => setSelectedProduct(null)}
				>
					✕
				</button>
				<img src={product?.image} className="h-48 object-contain" />
				<h2 className="text-black text-lg font-bold">{product?.title}</h2>
				<p className="text-sm text-gray-500">
					{product?.rating?.rate}/5.00 ({product?.rating?.count} reviews)
				</p>
				<p className="text-xl font-semibold">${product?.price.toFixed(2)}</p>
				<p className="text-sm">{product?.description}</p>
			</div>
		</div>
	);
}

// --- Component ---

export default function Shop() {

    const { cartItems, addToCart } = useContext(CartContext);

    
	const items = useShopItems();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

	const itemsToRender = useMemo(
		() =>
			selectedCategory
				? (items?.filter((item) => item.category === selectedCategory) ?? null)
				: items,
		[items, selectedCategory],
	);

	const ITEM_CATEGORIES = useMemo(
		() => Array.from(new Set(items?.map((item) => item.category))).toSorted(),
		[items],
	);

	if (!items) return <div>Loading...</div>;

	return (
		<>
			{/* PRODUCT DETAIL OVERLAY */}
			{selectedProduct && (
				<ProductDetails
					product={selectedProduct}
					setSelectedProduct={setSelectedProduct}
				/>
			)}

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
					<div>
						<ProductCard
							key={item.id}
							{...item}
							onDetailsClick={() => setSelectedProduct(item)}
						/>
						<button onClick={()=>addToCart(item)}>ADD TO CART</button>
					</div>
				))}
			</div>
		</>
	);
}
