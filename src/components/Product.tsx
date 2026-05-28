import { useState } from "react";
import mock from "../assets/mock.jpg";
import type { ProductData } from "../types";
import { Plus } from "lucide-react";

type ProductProps = ProductData & {
	onDetailsClick: () => void;
	onAddToCart: () => void;
};

export default function ProductCard({
	id,
	title,
	price,
	description,
	category,
	image,
	rating: { rate, count },
	onDetailsClick,
	onAddToCart,
}: ProductProps) {
	const [hover, setHover] = useState(false);
	return (
		<div
			className={`product flex flex-col justify-between`}
			id={String(id)}
			onClick={onDetailsClick}
		>
			<div className="relative flex justify-center bg-white">
				<img
					src={image}
					className="p-15 h-70 object-contain"
					onError={(e) => (e.currentTarget.src = mock)}
				/>
				<button
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					className={`absolute justify-between bottom-0 right-0 flex flex-row-reverse items-center overflow-hidden bg-black cursor-pointer transition-[width] duration-200 ${hover ? "w-full" : "w-14"}`}
					onClick={(e) => {
						e.stopPropagation();
						onAddToCart();
					}}
				>
					<div className="size-14 flex items-center justify-center shrink-0">
						<Plus />
					</div>
					<span className="px-5 whitespace-nowrap">ADD TO CART</span>
				</button>
			</div>
			<h2 className="pt-5 text-center text-pretty ">{title}</h2>
			<p className="text-xs">
				{rate}/5.00 ({count} reviews)
			</p>
			<h3 className="text-lg">${price.toFixed(2)}</h3>
		</div>
	);
}
