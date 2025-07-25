// CategoryFilter.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Props = { value: string; onChange(v: string): void };

const CategoryFilter: React.FC<Props> = ({ value, onChange }) =>{ 
  // Fetch data from supabase
  const [categories, setCategories] = useState<string[]>(["All"]);
  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
    } else {

      const uniqueCategories = Array.from(
        new Set(data?.map((blog) => blog.category).filter(Boolean))
        );

      setCategories(["All", ...uniqueCategories]);
    }
  };

  useEffect(() => {
    fetchBlogs();

    const channel = supabase
      .channel("blogs-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "blogs" },
        () => fetchBlogs()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return(
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
);}

export default CategoryFilter;
 