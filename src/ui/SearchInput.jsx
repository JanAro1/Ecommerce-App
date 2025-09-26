import { useEffect, useState } from "react";

export default function SearchInput({ value, onChange, placeholder }) {
  const [local, setLocal] = useState(value || "");

  useEffect(() => setLocal(value || ""), [value]);

  useEffect(() => {
    const id = setTimeout(() => onChange(local), 350);
    return () => clearTimeout(id);
  }, [local, onChange]);

  return (
    <input
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
      className="text-input"
    />
  );
}
