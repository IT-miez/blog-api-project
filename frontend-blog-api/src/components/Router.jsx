import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";
import Login from "./Login"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "profile/:name",
      element: <Profile />,
    },
    {
        path: "login",
        element: <Login />,
      },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;