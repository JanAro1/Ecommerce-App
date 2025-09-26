import { useCart } from "../state/CartContext.jsx";

export default function CartBadge() {
  const { totalItems } = useCart();
  return (
    <span className="cart-badge">
      🛒 <span className="badge">{totalItems}</span>
    </span>
  );
}
