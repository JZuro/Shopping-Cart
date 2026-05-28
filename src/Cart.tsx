import { CartContext } from "./Contexts";
import { useContext } from "react";

export default function Cart () {
    const { cartItems } = useContext(CartContext);


    return (
		<>
			<div id="cart" className="flex basis-[70vh] flex-col justify-center align-center" >
                {(cartItems.length===0) && <h3>Your cart is empty!</h3>}
                {cartItems.map((item)=>{return (
									<div
										className={`product ${item.category} flex flex-col`}
										id={String(item.id)}
									>
										<div className="flex object-contain justify-center align-center bg-white">
											<img src={item.image} className="p-10 h-65 object-contain" />
										</div>
										<h2 className="pt-5">{item.title}</h2>
										<p className="text-xs">
											{item.rating.rate}/5.00 ({item.rating.count} reviews)
										</p>
										<h3 className="text-lg">${item.price.toFixed(2)}</h3>
										<p hidden>{item.description}</p>
									</div>
								);})}
            </div>
		</>
	);
}