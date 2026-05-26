import mock from "../assets/mock.jpg"

type ProductProps = {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	rating: {
    rate: number
    count: number
}
};

export default function Product({
	id,
	title,
	price,
	category,
	description,
	rating:{
		rate, 
		count
	},
}: ProductProps) {
	return (
		<>
			<div className={`product ${category} flex flex-col`} id={String(id)}>
				<img src={mock} />
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
