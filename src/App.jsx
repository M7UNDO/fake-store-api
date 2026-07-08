import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Favourites from "./pages/Favourites";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Authentication from "./pages/Authentication";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/Favourites" element={<Favourites />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Route>

                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Authentication mode="login" />} />
                  <Route path="/signup" element={<Authentication mode="signup" />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;