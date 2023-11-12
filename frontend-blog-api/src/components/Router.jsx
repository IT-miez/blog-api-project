import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";
import Login from "./Login"
import Register from "./Register";
import CreatePost from "./CreatePost";

const Router = () => {
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
  ]);

  return <RouterProvider router={router} />;
};

export default Router;