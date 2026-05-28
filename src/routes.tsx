import HomePage from "./App";
import Shop from "./Shop";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";
import Layout from "./Layout";

const routes = [
	{
		element: <Layout />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/shop", element: <Shop /> },
			{ path: "/cart", element: <Cart /> },
			{ path: "/*", element: <ErrorPage />, errorElement: <ErrorPage /> },
		],
	},
];

export default routes;
