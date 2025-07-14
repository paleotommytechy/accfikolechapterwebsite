// SearchBar.tsx
import React from "react";
import type { ChangeEvent } from "react";

type Props = { value: string; onChange(v: string): void };
const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <input
    type="search"
    className="form-control"
    placeholder="Search blog posts…"
    value={value}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
  />
);

export default SearchBar;
