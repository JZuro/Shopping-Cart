import { useState, useMemo, useContext } from "react";
import type { productData } from "../types";
import ProductCard from "../components/ProductCard";
import "./Shop.css";
import { CartContext } from "../context/CartContext";
import useShopItems from "../hooks/useShopItems";

function ProductDetails({
	product,
	setSelectedProduct,
}: {
	product: productData | null;
	setSelectedProduct: (p: productData | null) => void;
}): React.ReactElement {
	return (
		<div
			className="fixed inset-0 z-50 flex align-center items-center justify-center bg-black/60"
			onClick={() => setSelectedProduct(null)}
		>
			<div
				className="bg-(--details) text-(--text) rounded-xl p-8 max-w-lg w-full mx-4 flex flex-col items-center"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="self-end text-gray-500 hover:text-black"
					onClick={() => setSelectedProduct(null)}
				>
					✕
				</button>
				<div className="flex justify-center items-center h-70 w-70 p-5 bg-white"><img src={product?.image} className="h-55 drop-shadow-lg object-contain" /></div>
				<h2 className="pt-5 text-(--text-h) text-lg font-bold">{product?.title}</h2>
				<p className="text-sm text-gray-500">
					{product?.rating?.rate}/5.00 ({product?.rating?.count} reviews)
				</p>
				<p className="text-xl font-semibold">${product?.price.toFixed(2)}</p>
				<p className="h-40 flex text-sm overflow-y-scroll">{product?.description}</p>
			</div>
		</div>
	);
}

export default function Shop() {
	const { addToCart }  = useContext(CartContext);

	const items = useShopItems();
	const [selectedCategory, setSelectedCategory] = useState<string | null>("all");
	const [selectedProduct, setSelectedProduct] = useState<productData | null>(null);

	const itemsToRender = useMemo(
		() =>
			selectedCategory == "all"
				? items
				: items?.filter((item) => item.category === selectedCategory),
		[items, selectedCategory]
	);

	const ITEM_CATEGORIES = useMemo(() => {
		const item_categories = Array.from(
			new Set(items?.map((item) => item.category))
		).toSorted();
		item_categories.unshift("all");
		return item_categories;
	}, [items]);

	if (!items) return <div>Loading...</div>;

	return (
		<>
			{selectedProduct && (
				<ProductDetails
					product={selectedProduct}
					setSelectedProduct={setSelectedProduct}
				/>
			)}

			<div
				id="categories"
				className="flex flex-col md:flex-row text-xl md:text-base mt-5 p-1 px-10 justify-around align-center md:gap-10"
			>
				{ITEM_CATEGORIES.map((category) => (
					<div key={category} className={"category hover:text-gray-100"}>
						<button
							className={`capitalize ${category == selectedCategory && "active"}`}
							onClick={() => setSelectedCategory(category)}
						>
							{category}
						</button>
					</div>
				))}
			</div>

			<div className="products p-5 md:p-15 grid grid-cols-1 gap-6 md:gap-10 sm:grid-cols-2 md:grid-cols-3">
				{itemsToRender?.map((item) => (
					<ProductCard
						key={item.id}
						{...item}
						onDetailsClick={() => setSelectedProduct(item)}
						onAddToCart={() => addToCart(item)}
					/>
				))}
			</div>
		</>
	);
}
