import HomePage from "./App";
import Shop from "./Shop";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";
import App from "./Layout";

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
