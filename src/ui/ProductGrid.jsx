import ProductCard from "./ProductCard.jsx";
import Skeleton from "./Skeleton.jsx";

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} />)}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="empty">No results found.</div>;
  }

  return (
    <div className="grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
