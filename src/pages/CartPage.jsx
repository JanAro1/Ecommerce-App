import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../state/CartContext.jsx";
import QtyInput from "../ui/QtyInput.jsx";
import Price from "../ui/Price.jsx";

export default function CartPage() {
  const { state, dispatch, subtotal, computeLine } = useCart();
  const navigate = useNavigate();

  const remove = (id) => dispatch({ type: "REMOVE", payload: { id } });
  const setQty = (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } });

  if (state.items.length === 0) {
    return (
      <div className="vstack gap-16">
        <h2>Your cart is empty</h2>
        <Link className="btn" to="/">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      <div className="cart-grid">
        <div className="cart-list">
          {state.items.map(item => {
            const { discounted, lineTotal } = computeLine(item);
            return (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p className="muted small">{item.brand} • {item.category}</p>
                  <Price price={item.price} discountPercentage={item.discountPercentage} currency="₱" />
                  <div className="hstack gap-8">
                    <QtyInput value={item.qty} onChange={(q) => setQty(item.id, q)} />
                    <button className="btn danger" onClick={() => remove(item.id)}>Remove</button>
                  </div>
                </div>
                <div className="cart-line-total">
                  <span className="small muted">Line total</span>
                  <div className="price">
                    <span className="price-main">₱{lineTotal}</span>
                    <span className="small muted">({item.qty} × ₱{discounted})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₱{subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>₱0</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₱{subtotal}</span>
          </div>
          <button className="btn wide" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
          <button className="btn ghost wide" onClick={() => dispatch({ type: "CLEAR" })}>
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
