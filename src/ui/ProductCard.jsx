import { Link } from "react-router-dom";
import Price from "./Price.jsx";
import Rating from "./Rating.jsx";
import { useCart } from "../state/CartContext.jsx";

export default function ProductCard({ product }) {
  const { dispatch } = useCart();

  const add = (e) => {
    e.preventDefault(); // prevent navigating when clicking button inside Link
    dispatch({ type: "ADD", payload: { product, qty: 1 } });
  };

  return (
    <Link to={`/product/${product.id}`} className="card">
      <img src={product.thumbnail} alt={product.title} className="card-img" />
      <div className="card-body">
        <h3 className="title">{product.title}</h3>
        <p className="muted small">{product.brand}</p>
        <Price price={product.price} discountPercentage={product.discountPercentage} currency="₱" />
        <div className="hstack between">
          <Rating value={product.rating} />
          <span className="small">Stock: {product.stock}</span>
        </div>
        <div className="hstack gap-8" style={{ marginTop: 8 }}>
          <button className="btn small" onClick={add}>Add to Cart</button>
          <Link to="/cart" className="btn ghost small" onClick={(e) => e.stopPropagation()}>Cart</Link>
        </div>
      </div>
    </Link>
  );
}
