import {createBrowserRouter} from "react-router-dom";
import Layout from "../Home/Layout/Layout";
import Home from "../Home/Home Page/Home";
import Login from "../Home/Login & Reg/Login";
import Registration from "../Home/Login & Reg/Registration";
import Products from "../Home/Products/Products";
import Carts from "../Home/My Cart/Carts";
import Checkout from "../Home/Checkout/Checkout";
import PrivateRoute from "./PrivateRoute";

  const router = createBrowserRouter([
    {
      path: "/",
       element: <Layout />,
       children:[
        {
          path:'/',
          element:<Home/>,
        },
        {
          path:'/products',
          element:<Products/>,
        },
        {
          path:'/cart',
          element: <PrivateRoute><Carts/></PrivateRoute>,
        },
        {
          path:'/checkout',
          element: <PrivateRoute><Checkout/></PrivateRoute>
        }
       ]
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Registration/>
    }
  ]);

export default router