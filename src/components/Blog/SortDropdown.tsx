// SortDropdown.tsx
import React from "react";
type Props = { value: string; onChange(v: string): void };
const SortDropdown: React.FC<Props> = ({ value, onChange }) => (
  <select
    className="form-select"
    style={{ maxWidth: 180 }}
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    <option value="date">Date</option>
    <option value="author">Author</option>
    <option value="title">Title</option>
  </select>
);
export default SortDropdown;
