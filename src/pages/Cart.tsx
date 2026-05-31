import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import CartItem from "../components/CartItem";

export default function Cart() {
	const {
		cartItems,
		priceTotal,
	} = useContext(CartContext);

	return (
		<div className="mt-5 mb-30 px-4 md:px-15">
			{cartItems.length === 0 ? (
				<p className="py-5 text-center">Your cart is empty!</p>
			) : (
				<>
					<table className="w-full border-collapse max-md:block">
						<thead className="table-header-group max-md:hidden">
							<tr className="text-sm text-(--text) border-b-2 border-(--border)">
								<th />
								<th />
								<th>Product</th>
								<th>Price</th>
								<th>Qty.</th>
								<th>Subtotal</th>
							</tr>
						</thead>
						<tbody className="max-md:block max-md:space-y-3">
							{cartItems.map((item) => (
								<CartItem item={item} key={item.id} />
							))}
						</tbody>
						<tfoot className="max-md:block">
							<tr className="border-t-2 border-(--border) max-md:block">
								<td
									colSpan={6}
									className="pt-5 px-5 text-right font-medium max-md:px-0"
								>
									Total:&nbsp; ${priceTotal.toFixed(2)}
								</td>
							</tr>
						</tfoot>
					</table>
					<button className="bg-(--social-bg) hover:bg-(--accent-bg) text-(--text) border border-(--border) p-3 m-5">
						Proceed to checkout
					</button>
				</>
			)}
		</div>
	);
}
