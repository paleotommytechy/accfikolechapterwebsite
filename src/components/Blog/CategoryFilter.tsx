// CategoryFilter.tsx
import React from "react";
const categories = ["All", "Faith", "Relationship", "Wisdom"];
type Props = { value: string; onChange(v: string): void };

const CategoryFilter: React.FC<Props> = ({ value, onChange }) => (
  <div className="d-flex gap-2 flex-wrap">
    {categories.map(cat => (
      <button
        key={cat}
        className={`btn btn-sm ${value === cat ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => onChange(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
