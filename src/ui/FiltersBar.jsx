import SearchInput from "./SearchInput.jsx";

export default function FiltersBar({
  q, onQChange,
  categories, category, onCategoryChange,
  sort, onSortChange,
  minPrice, maxPrice, onMinPriceChange, onMaxPriceChange
}) {
  return (
    <section className="filters">
      <div className="filters-row">
        <div className="field">
          <label>Search</label>
          <SearchInput value={q} onChange={onQChange} placeholder="Search products…" />
        </div>

        <div className="field">
          <label>Category</label>
          <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
            {categories.map((c, i) => {
              if (typeof c === "string") {
                return <option key={c} value={c}>{c}</option>;
              }
              return <option key={c.slug || i} value={c.slug}>{c.name}</option>;
            })}
          </select>
        </div>

        <div className="field">
          <label>Sort</label>
          <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating: High → Low</option>
            <option value="title-asc">Title: A → Z</option>
          </select>
        </div>

        <div className="field range">
          <label>Price range</label>
          <div className="hstack gap-8">
            <input type="number" placeholder="Min" value={minPrice} onChange={e => onMinPriceChange(e.target.value)} />
            <input type="number" placeholder="Max" value={maxPrice} onChange={e => onMaxPriceChange(e.target.value)} />
          </div>
        </div>
      </div>
    </section>
  );
}
