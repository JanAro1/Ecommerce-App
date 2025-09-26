import { Routes, Route, Link } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import CartBadge from "./ui/CartBadge.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="container header">
        <Link to="/" className="brand">Shop</Link>
        <nav className="hstack">
          <Link to="/">Home</Link>
          <Link to="/cart" className="hstack gap-8">
            <CartBadge />
          </Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </main>

      <footer className="container footer">
        <small>Demo E-Commerce using DummyJSON</small>
      </footer>
    </div>
  );
}
