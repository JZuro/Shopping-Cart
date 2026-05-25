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
			<div className={`product ${category}`} id={String(id)}>
				<h2>{title}</h2>
				<h3>${price}</h3>
				<p>{description}</p>
				<p>{rate}/5.00 ({count})</p>

			</div>
		</>
	);
}
