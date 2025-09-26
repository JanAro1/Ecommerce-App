export default function QtyInput({ value = 1, onChange }) {
  const inc = () => onChange(Math.min(99, value + 1));
  const dec = () => onChange(Math.max(1, value - 1));
  const set = (e) => {
    const n = Number(e.target.value);
    if (!Number.isNaN(n)) onChange(Math.max(1, Math.min(99, n)));
  };
  return (
    <div className="qty">
      <button className="btn small" type="button" onClick={dec}>-</button>
      <input className="qty-input" type="number" value={value} onChange={set} />
      <button className="btn small" type="button" onClick={inc}>+</button>
    </div>
  );
}
