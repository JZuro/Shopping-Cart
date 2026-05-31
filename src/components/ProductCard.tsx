import { useRef, useState } from "react";
import mock from "../assets/mock.jpg";
import type { productData } from "../types";
import { Plus } from "lucide-react";

type ProductProps = {
	product: productData;
	onDetailsClick: (item: productData) => void;
	onAddToCart: (item: productData) => void;
};

export default function ProductCard({ product, onDetailsClick, onAddToCart }: ProductProps) {
	const { id, title, price, image, rating: { rate, count } } = product;
	const [expanded, setExpanded] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const mouseInsideRef = useRef(false);

	function scheduleCollapse() {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			timerRef.current = null;
			if (!mouseInsideRef.current) setExpanded(false);
		}, 4000);
	}

	return (
		<div
			className="product flex flex-col"
			id={String(id)}
			onClick={() => onDetailsClick(product)}
			onMouseLeave={() => {
				mouseInsideRef.current = false;
				if (timerRef.current === null) setExpanded(false);
			}}
			onMouseEnter={() => {
				mouseInsideRef.current = true;
			}}
		>
			<div className="relative flex justify-center bg-white">
				<img
					src={image}
					className="drop-shadow-lg p-5 md:p-15 h-55 md:h-70 object-contain"
					onError={(e) => (e.currentTarget.src = mock)}
				/>
				<button
					className={`absolute justify-between bottom-0 right-0 flex flex-row-reverse items-center overflow-hidden bg-black cursor-pointer transition-[width] duration-200  ${expanded ? "w-full" : "w-14"}`}
					onClick={(e) => {
						e.stopPropagation();
						onAddToCart(product);
						setExpanded(true);
						scheduleCollapse();
					}}
				>
					<div className="size-14 flex items-center justify-center shrink-0">
						<Plus color="var(--plus)" />
					</div>
					<span className="text-(--plus) px-5 whitespace-nowrap">
						ADDED TO CART
					</span>
				</button>
			</div>
			<div className="pt-5 flex flex-col justify-between flex-1">
				<span className="mb-5">{title}</span>
				<div className="flex flex-col">
					<span className="text-xs">
						{rate}/5.00 ({count} reviews)
					</span>
					<span className="text-lg">${price.toFixed(2)}</span>
				</div>
			</div>
		</div>
	);
}
