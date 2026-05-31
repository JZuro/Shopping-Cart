import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
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
