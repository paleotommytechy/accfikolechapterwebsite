import React, { useMemo, useState } from "react";
import { blogs} from "../data/blogs";
import type { Blog } from "../data/blogs";
import SearchBar from "../components/Blog/SearchBar";
import CategoryFilter from "../components/Blog/CategoryFilter";
import SortDropdown from "../components/Blog/SortDropdown";
import FeaturedCard from "../components/Blog/FeaturedCard";
import PostCard from "../components/Blog/PostCard";
import { useDebounce } from "../hooks/useDebounce";

import Img from "../assets/images/image7.jpg"
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query);

  // ---------- Filter & sort ----------
  const filtered = useMemo(() => {
    let list: Blog[] = blogs;

    if (category !== "All") list = list.filter(b => b.category === category);

    if (debouncedQuery)
      list = list.filter(b =>
        b.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

    if (sortBy === "date") list.sort((a, b) => b.date.localeCompare(a.date));
    if (sortBy === "author") list.sort((a, b) => a.author.name.localeCompare(b.author.name));
    if (sortBy === "title") list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [category, debouncedQuery, sortBy]);

  const featured = filtered.filter(b => b.featured).slice(0, 3);
  const recent   = filtered.filter(b => !b.featured);
  const visible  = recent.slice(0, page * PER_PAGE);
  const canLoad  = visible.length < recent.length;

  return (
    <>
    <Navbar />
    <div 
      className="d-flex align-items-center text-white z-1 mb-0"
      style={{
        position: 'relative',
        height: '50vh',
        background: `url(${Img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'center',
        borderRadius: '0 0 15px 15px'

      }}
      data-aos='fade-up'
      >
      <div style={{margin:'240px 0 0 50px'}}>
        <h1>BLOG</h1>
        <p>
          <Link to="/" className="text-white fw-bold text-decoration-none fs-6">HOME</Link>
          &nbsp;&nbsp;|| &nbsp;&nbsp;
          <Link to='/blog' className="text-white fw-bold text-decoration-none fs-6">
            BLOG
          </Link>
        </p>
      </div>
    </div>
    <div className="container py-5">
      
      {/* ---- Search & controls ---- */}
      <div className="row g-3 mb-4">
        <div className="col-md-6"><SearchBar value={query} onChange={setQuery} /></div>
        <div className="col-md-4 d-flex align-items-center">
          <CategoryFilter value={category} onChange={cat => {setCategory(cat); setPage(1);}} />
        </div>
        <div className="col-md-2"><SortDropdown value={sortBy} onChange={setSortBy} /></div>
      </div>

      {/* ---- Featured ---- */}
      {featured.length > 0 && (
        <>
          <h5 className="mb-3">Featured</h5>
          {featured.map(f => <FeaturedCard key={f.id} post={f} />)}
        </>
      )}

      {/* ---- Recent ---- */}
      <h5 className="mt-5 mb-3">Recent Posts</h5>
      <div className="row">
        {visible.map(p => (
          <div className="col-md-6 col-lg-4" key={p.id}>
            <PostCard post={p} />
          </div>
        ))}
      </div>

      {canLoad && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary" onClick={() => setPage(p => p + 1)}>
            Load More
          </button>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default BlogPage;
