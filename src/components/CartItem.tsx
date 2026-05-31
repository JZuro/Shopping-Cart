import { useContext } from "react";
import type { cartItemData } from "../types.ts";
import { X } from "lucide-react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }: { item: cartItemData }) {
	const {
		addToCart,
		decreaseQuantity,
		removeFromCart,
	} = useContext(CartContext);
	return (
		<tr className="border-b border-b-gray-500 last:border-b-0
		               max-md:flex max-md:flex-wrap max-md:items-start max-md:gap-x-3 max-md:gap-y-3
		               max-md:border max-md:border-(--border) max-md:border-b-0 max-md:rounded max-md:p-3">

			{/* Remove button */}
			<td className="py-4 max-md:order-3 max-md:ml-auto max-md:py-0">
				<button
					onClick={() => removeFromCart(item.id)}
					className="hover:text-gray-100 cursor-pointer p-3"
				>
					<X size={18} />
				</button>
			</td>

			{/* Image */}
			<td className="py-4 max-md:order-1 max-md:py-0 max-md:block hidden md:table-cell">
				<div className="bg-white p-2 w-20 h-20 md:w-35 md:h-35 flex items-center justify-center">
					<img
						src={item.image}
						className="drop-shadow-lg w-full h-full object-contain"
					/>
				</div>
			</td>

			{/* Title + category */}
			<td className="py-4 px-2 md:px-6 max-w-40 md:max-w-60
			               max-md:order-2 max-md:flex-1 max-md:min-w-0 max-md:py-0 max-md:px-0">
				<span className="block text-sm font-medium truncate">
					{item.title}
				</span>
				<span className="block text-sm font-light mt-1 capitalize">
					{item.category}
				</span>
			</td>

			{/* Price */}
			<td className="py-4 px-2 md:px-6 text-sm font-light
			               max-md:order-4 max-md:w-full max-md:py-0 max-md:px-0">
				${item.price.toFixed(2)}
			</td>

			{/* Qty controls */}
			<td className="py-4 px-2 md:px-6
			               max-md:order-5 max-md:w-full max-md:py-0 max-md:px-0">
				<div className="flex items-center gap-2 max-md:justify-around">
					<button
						onClick={() => decreaseQuantity(item.id)}
						className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 cursor-pointer"
					>
						−
					</button>
					<span className="w-8 text-center font-light">
						{item.quantity}
					</span>
					<button
						onClick={() => addToCart(item)}
						className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 cursor-pointer"
					>
						+
					</button>
				</div>
			</td>

			{/* Subtotal — desktop only */}
			<td className="hidden md:table-cell py-5 px-6 text-md font-light">
				${(item.price * item.quantity).toFixed(2)}
			</td>
		</tr>
	);
}
