import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import AddProduct from "../pages/AddProducts";
import EditProduct from "../pages/EditProducts";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Favorites from "../pages/Favorites";
import Cart from "../pages/Cart"; // <- ee line add chey

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      
      {/* Duplicate route teesesa - okate ProtectedRoute undali */}
      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} /> {/* <- ee line add chey */}
    </Routes>
  );
}

export default AppRoutes;