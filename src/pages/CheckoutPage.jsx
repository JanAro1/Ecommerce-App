import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../state/CartContext.jsx";

export default function CheckoutPage() {
  const { state, subtotal, dispatch } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [error, setError] = useState("");

  const placeOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      setError("Please fill all fields.");
      return;
    }
    // Simulate success
    dispatch({ type: "CLEAR" });
    navigate("/", { replace: true });
    alert("Order placed! Thank you.");
  };

  if (state.items.length === 0) {
    return (
      <div className="vstack gap-16">
        <h2>No items to checkout</h2>
        <Link className="btn" to="/">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={placeOrder}>
          <div className="field">
            <label>Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label>Email</label>
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field">
            <label>Address</label>
            <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>

          {error && <div className="error">{error}</div>}

          <button className="btn wide" type="submit">Place Order</button>
          <Link className="btn ghost wide" to="/cart">Back to Cart</Link>
        </form>

        <aside className="checkout-summary">
          <h3>Summary</h3>
          <ul className="summary-list">
            {state.items.map(i => (
              <li key={i.id} className="summary-item">
                <span>{i.title} × {i.qty}</span>
                <span>₱{Math.round(i.price * (1 - (i.discountPercentage || 0) / 100)) * i.qty}</span>
              </li>
            ))}
          </ul>
          <div className="summary-row total">
            <span>Total</span>
            <span>₱{subtotal}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
