import { useState, useMemo, useContext } from "react";
import type { productData } from "../types";
import ProductCard from "../components/ProductCard";
import "./Shop.css";
import { CartContext } from "../context/CartContext";
import useShopItems from "../hooks/useShopItems";
import { Plus, X } from "lucide-react";

function ProductDetails({
	product,
	setSelectedProduct,
	onAddToCart,
}: {
	product: productData | null;
	setSelectedProduct: (p: productData | null) => void;
	onAddToCart: () => void;
}): React.ReactElement {
	const close = () => setSelectedProduct(null);
	const [added, setAdded] = useState(false);
	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
			onClick={close}
		>
			<div
				id="detailsModal"
				className="m-1 p-3 bg-(--details) text-(--text) rounded-lg max-w-lg w-dvw h-dvh flex flex-col justify-start items-center gap-3 md:gap-2"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="mr-3 self-end text-(--text-h) text-2xl hover:text-black"
					onClick={close}
				>
					<X />
				</button>
				<div className="flex mb-2 justify-center items-center md:h-70 md:w-70 h-80 w-80 p-10 m-0 bg-white">
					<img
						src={product?.image}
						className="md:h-60 w-full drop-shadow-lg md:object-contain m-0"
					/>
				</div>
				{/* ITEM DETAILS */}
				<div
					id="itemDetails"
					className="flex-1 flex flex-col justify-start gap-1"
				>
					<h2
						id="itemTitle"
						className="text-center text-(--text-h) text-lg font-bold"
					>
						{product?.title}
					</h2>
					<div
						id="itemRatingPrice"
						className="flex items-center justify-between px-6 py-1"
					>
						<p className="align-text-center text-sm text-gray-500 m-0 p-0">
							{product?.rating?.rate}/5.00 (
							{product?.rating?.count} reviews)
						</p>
						<p className="align-text-center text-xl font-semibold">
							${product?.price.toFixed(2)}
						</p>
					</div>
				<div className="md:max-h-40 max-h-60 overflow-y-auto text-sm">
					<p
						className="text-justify text-pretty"
						id="itemDescription"
					>
						{product?.description}
					</p>
				</div>
				</div>
				<button
					className="md:my-1 md:py-1 my-2 py-2 w-60 justify-center shrink-0 flex flex-row items-center bg-black cursor-pointer"
					onClick={() => {
						onAddToCart();
						setAdded(true);
					}}
				>
					<span className="text-(--plus) px-5">
						{added ? "ADDED TO CART" : "ADD TO CART"}
					</span>
					<div className="size-14 flex items-center justify-center shrink-0">
						<Plus color="var(--plus)" />
					</div>
				</button>
			</div>
		</div>
	);
}

export default function Shop() {
	const { addToCart } = useContext(CartContext);

	const items = useShopItems();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		"all"
	);
	const [selectedProduct, setSelectedProduct] = useState<productData | null>(
		null
	);

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
					onAddToCart={() =>
						selectedProduct && addToCart(selectedProduct)
					}
				/>
			)}

			<div
				id="categories"
				className="flex flex-col md:flex-row text-xl md:text-base mt-5 p-1 px-10 justify-around align-center md:gap-10"
			>
				{ITEM_CATEGORIES.map((category) => (
					<div
						key={category}
						className={"category hover:text-(--accent-bg)"}
					>
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
						product={item}
						onDetailsClick={setSelectedProduct}
						onAddToCart={addToCart}
					/>
				))}
			</div>
		</>
	);
}
