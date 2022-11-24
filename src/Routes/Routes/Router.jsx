import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Signin from "../../Pages/Authentication/Signin";
import Signup from "../../Pages/Authentication/Signup";
import AddAProduct from "../../Pages/Dashboard/AddAProduct/AddAProduct";
import CategoryPage from "../../Pages/Home/CategoryPage/CategoryPage/CategoryPage";
import Home from "../../Pages/Home/Home/Home";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/category/:id",
        element: <CategoryPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/addAProduct",
        element: <AddAProduct />,
      },
    ],
  },
]);

export default router;
