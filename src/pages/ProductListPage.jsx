import { useEffect, useMemo, useState } from "react";
import { fetchProducts, searchProducts, fetchCategories } from "../lib/api.js";
import FiltersBar from "../ui/FiltersBar.jsx";
import ProductGrid from "../ui/ProductGrid.jsx";
import Pagination from "../ui/Pagination.jsx";

const PAGE_SIZE = 12;

export default function ProductListPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("price-asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState(["all"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [base, setBase] = useState({ products: [], total: 0 });

  const skip = (page - 1) * PAGE_SIZE;

  useEffect(() => {
    (async () => {
      try {
        const cats = await fetchCategories();
        setCategories(["all", ...cats]);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = q.trim()
          ? await searchProducts({ q: q.trim(), limit: PAGE_SIZE, skip })
          : await fetchProducts({ limit: PAGE_SIZE, skip });
        if (!alive) return;
        setBase({ products: data.products || [], total: data.total || 0 });
      } catch (e) {
        if (!alive) return;
        setError(e.message || "Something went wrong");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [q, page]);

  useEffect(() => {
    setPage(1);
  }, [q, category, sort, minPrice, maxPrice]);

  const filtered = useMemo(() => {
    let items = [...base.products];

    if (category !== "all") {
      items = items.filter((p) => p.category === category || p.category?.slug === category);
    }

    const min = minPrice !== "" ? Number(minPrice) : -Infinity;
    const max = maxPrice !== "" ? Number(maxPrice) : Infinity;
    items = items.filter((p) => p.price >= min && p.price <= max);

    items.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      return 0;
    });

    return items;
  }, [base.products, category, minPrice, maxPrice, sort]);

  return (
    <div className="vstack gap-16">
      <FiltersBar
        q={q}
        onQChange={setQ}
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
      />

      {error && <div className="error">{error}</div>}
      <ProductGrid products={filtered} loading={loading} />

      <Pagination page={page} pageSize={PAGE_SIZE} total={base.total} onChange={setPage} />
    </div>
  );
}
