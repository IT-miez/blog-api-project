import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import Register from "./Register";
import CreatePost from "./CreatePost";
import LargePost from "./LargePost";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/profile/:name",
		element: <Profile />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/post/create",
		element: <CreatePost />,
	},
	{
		path: "/post/:postid",
		element: <LargePost />,
	},
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
