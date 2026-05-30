import { CartContext } from "./Contexts";
import { useContext } from "react";
import CartItem from "./components/CartItem";

export default function Cart() {
	const {
		cartItems,
		priceTotal,
		addToCart,
		decreaseQuantity,
		removeFromCart,
	} = useContext(CartContext);

	return (
		<div className="my-5 px-4">
			{cartItems.length === 0 ? (
				<p className="py-5 text-center">Your cart is empty.</p>
			) : (
				<table className="w-full border-collapse">
					<thead>
						<tr className="text-sm text-gray-400 border-b-2">
							<th className="pb-2 w-0" />
							<th className="pb-2 w-35" />
							<th className="pb-2 text-center font-lg px-6">
								Product
							</th>
							<th className="pb-2 text-right font-lg px-9">
								Price
							</th>
							<th className="pb-2 text-center font-lg px-6">
								Qty.
							</th>
							<th className="pb-2 text-right font-lg px-6">
								Subtotal
							</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((item) => (
							<CartItem item={item}/>
						))}
					</tbody>
					<tfoot>
						<tr className="border-t-2">
							<td
								colSpan={6}
								className="pt-5 px-5 text-right font-medium"
							>
								Total:&nbsp; ${priceTotal.toFixed(2)}
							</td>
						</tr>
					</tfoot>
				</table>
			)}
		</div>
	);
}
