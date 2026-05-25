import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";

const routes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/shop",
		element: <Shop />,
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/*",
		element: <ErrorPage />,
		errorElement: <ErrorPage />,
	},

];

export default routes;
