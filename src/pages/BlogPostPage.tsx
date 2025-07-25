import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { Blog } from "../types/blog";
// import { blogs } from "../data/blogs";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useState } from "react";
import { format } from "date-fns";

import Img from "../assets/images/image7.jpg"
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; 

const BlogPostPage: React.FC = () => {
 // Fetch data from supabase
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
    } else {
      setBlogs(data || []);
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

  
  const { id } = useParams();
  const post = blogs.find(b => b.id === id);
  const [liked, setLiked] = useState(false);

  if (!post) return <p>Post not found.</p>;

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
      <h2 className="fw-bold mb-1">{post.title}</h2>
      <p className="text-muted mb-4">
        {post.author_name} • {format(new Date(post.date), "MMM d, yyyy")}
      </p>

      {/* Thumbnail / hero */}
      <img src={post.thumbnail_url} className="img-fluid rounded mb-4" alt={post.title} data-aos="zoom-in" />

      {/* Body – assuming HTML/markdown already converted */}
      <div dangerouslySetInnerHTML={{ __html: post.body }} />

      {/* Actions */}
      <div className="d-flex gap-3 mt-5">
        <button className="btn btn-outline-danger" onClick={() => setLiked(!liked)}>
          {liked ? <FaHeart /> : <FaRegHeart />} {liked ? "Unlike" : "Like"}
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          <FaShareAlt /> Copy Link
        </button>
      </div>

      {/* Placeholder for comments */}
      <div className="mt-5">
        <h5>Comments</h5>
        <p className="text-muted">Comment system coming soon…</p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BlogPostPage;
