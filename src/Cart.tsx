import { CartContext } from "./Contexts";
import { useContext } from "react";
import { X } from "lucide-react";

export default function Cart() {
	const { cartItems, priceTotal, addToCart, decreaseQuantity, removeFromCart } =
		useContext(CartContext);

	return (
		<div className="mt-10 px-4">
			{cartItems.length === 0 ? (
				<p className="py-10 text-center">Your cart is empty.</p>
			) : (
				<table className="w-full border-collapse">
					<thead>
						<tr className="text-sm text-gray-400 border-b-2">
							<th className="pb-2 w-0" />
							<th className="pb-2 w-35" />
							<th className="pb-2 text-center font-normal px-6">Product</th>
							<th className="pb-2 text-right font-normal px-9">Price</th>
							<th className="pb-2 text-center font-normal px-6">Qty.</th>
							<th className="pb-2 text-right font-normal px-6">Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((item) => (
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
										<img src={item.image} className="w-full h-full object-contain" />
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
								<td className="py-5 px-6 text-right font-light">
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
								<td className="py-5 px-6 text-right font-light">
									${(item.price * item.quantity).toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr className="border-t-2">
							<td colSpan={6} className="pt-5 px-6 text-right font-medium">
								Total: ${priceTotal.toFixed(2)}
							</td>
						</tr>
					</tfoot>
				</table>
			)}
		</div>
	);
}
