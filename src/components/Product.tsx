import type { Product } from "../types";

type ProductProps = Product & { onDetailsClick: () => void };

export default function Product({
	id,
	title,
	price,
	description,
	category,
	image,
	rating: { rate, count },
	onDetailsClick,
}: ProductProps) {
	return (
		<>
			<div
				className={`product ${category} flex flex-col`}
				id={String(id)}
				onClick={onDetailsClick}
			>
				<div className="flex object-contain justify-center align-center bg-white">
					<img src={image} className="p-10 h-65 object-contain" />
				</div>
				<h2 className="pt-5">{title}</h2>
				<p className="text-xs">
					{rate}/5.00 ({count} reviews)
				</p>
				<h3 className="text-lg">${price.toFixed(2)}</h3>
				<p hidden>{description}</p>
			</div>
		</>
	);
}
