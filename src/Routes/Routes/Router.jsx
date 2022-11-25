import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Main from "../../layouts/Main";
import Signin from "../../Pages/Authentication/Signin";
import Signup from "../../Pages/Authentication/Signup";
import AddAProduct from "../../Pages/Dashboard/AddAProduct/AddAProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import ReportedProducts from "../../Pages/Dashboard/ReportedProducts/ReportedProducts";
import CategoryPage from "../../Pages/Home/CategoryPage/CategoryPage/CategoryPage";
import Home from "../../Pages/Home/Home/Home";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/addaproduct",
        element: (
          <SellerRoute>
            <AddAProduct />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <AdminRoute>
            <AllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reportedProducts",
        element: (
          <AdminRoute>
            <ReportedProducts />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
