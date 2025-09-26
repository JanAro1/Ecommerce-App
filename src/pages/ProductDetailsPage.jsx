import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct } from "../lib/api.js";
import Price from "../ui/Price.jsx";
import Rating from "../ui/Rating.jsx";
import QtyInput from "../ui/QtyInput.jsx";
import { useCart } from "../state/CartContext.jsx";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const { dispatch } = useCart();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const p = await fetchProduct(id);
        if (!alive) return;
        setProduct(p);
      } catch (e) {
        if (!alive) return;
        setError(e.message || "Failed to load product");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return null;

  const addToCart = () => {
    dispatch({ type: "ADD", payload: { product, qty } });
  };

  return (
    <div className="details">
      <Link to="/" className="back">&larr; Back</Link>

      <div className="details-grid">
        <div>
          <img src={product.thumbnail} alt={product.title} className="hero" />
          <div className="thumbs">
            {product.images?.map((src) => (
              <img key={src} src={src} alt="" />
            ))}
          </div>
        </div>

        <div>
          <h1>{product.title}</h1>
          <p className="muted">{product.brand} • {product.category}</p>

          <div className="price-row">
            <Price price={product.price} discountPercentage={product.discountPercentage} currency="₱" />
          </div>

          <div className="meta">
            <Rating value={product.rating} />
            <span className="stock">Stock: {product.stock}</span>
            {product.discountPercentage ? (
              <span className="discount">-{product.discountPercentage}%</span>
            ) : null}
          </div>

          <p className="desc">{product.description}</p>

          <div className="hstack gap-8" style={{ marginTop: 12 }}>
            <QtyInput value={qty} onChange={setQty} />
            <button className="btn" onClick={addToCart}>Add to Cart</button>
            <Link className="btn ghost" to="/cart">Go to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
