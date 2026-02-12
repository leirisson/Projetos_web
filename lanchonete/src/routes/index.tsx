import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "../Pages/Dashboard";
import { Cart } from "../Pages/Cart";
import { Checkout } from "../Pages/Checkout";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<ProtectedRoute><Register/></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}
