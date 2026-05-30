import { CartContext } from "./Contexts";
import { useContext } from "react";
import CartItem from "./components/CartItem";

export default function Cart() {
	const {
		cartItems,
		priceTotal,
		// addToCart,
		// decreaseQuantity,
		// removeFromCart,
	} = useContext(CartContext);

	return (
		<div className="my-5 mb-15 px-15">
			{cartItems.length === 0 ? (
				<p className="py-5 text-center">Your cart is empty.</p>
			) : (
				<table className="w-full border-collapse">
					<thead className="table-header-group">
						<tr className="text-sm text-gray-400 border-b-2">
							<th />
							<th />
							<th>Product</th>
							<th className="">Price</th>
							<th>Qty.</th>
							<th className="">Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((item) => (
							<CartItem item={item} />
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
