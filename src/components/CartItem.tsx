import type { cartItemData } from "../types.ts";
import { X } from "lucide-react";

export default function CartItem({ item }: { item: cartItemData }) {
	return (
		<tr key={item.id} className="border-b last:border-b-0">
			<td className="py-5">
				<button
					onClick={() => removeFromCart(item.id)}
					className="hover:text-gray-100 cursor-pointer p-5"
				>
					<X size={18} />
				</button>
			</td>
			<td className="py-5">
				<div className="bg-white p-3 w-35 h-35 flex items-center justify-center">
					<img
						src={item.image}
						className="w-full h-full object-contain"
					/>
				</div>
			</td>
			<td className="py-5 px-6 max-w-60">
				<span className="block text-sm font-medium truncate">
					{item.title}
				</span>
				<span className="block text-sm font-light mt-1 capitalize">
					{item.category}
				</span>
			</td>
			<td className="py-5 px-6 text-right text-sm font-light">
				${item.price.toFixed(2)}
			</td>
			<td className="py-5 px-6">
				<div className="flex justify-center items-center gap-2">
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
			<td className="py-5 px-6 text-right text-md font-light">
				${(item.price * item.quantity).toFixed(2)}
			</td>
		</tr>
	);
}
