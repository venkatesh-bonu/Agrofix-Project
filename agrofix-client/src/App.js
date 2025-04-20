import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Products from "./components/Products/Products.jsx";
import ProductItem from "./components/ProductItem/ProductItem.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Orders from "./components/Orders/Orders.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import AdminLogin from "./components/AdminLogin/AdminLogin.jsx";
import AdminProtectedRoute from "./ProtectedRoute/AdminProtectedRoute.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import AdminProducts from "./components/Admin/AdminProducts.jsx";
import AdminOrders from "./components/Admin/AdminOrders.jsx";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/admin/login" element={<AdminLogin />} />
      <Route
        exact
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <AdminProducts />
          </AdminProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <AdminOrders />
          </AdminProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        exact
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/products/:id"
        element={
          <ProtectedRoute>
            <ProductItem />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
