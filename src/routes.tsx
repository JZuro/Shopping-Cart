import HomePage from "./HomePage";
import Shop from "./Shop";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";
import App from "./App";

const routes = [
	{
		element: <App />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/shop", element: <Shop /> },
			{ path: "/cart", element: <Cart /> },
			{ path: "/*", element: <ErrorPage />, errorElement: <ErrorPage /> },
		],
	},
];

export default routes;
