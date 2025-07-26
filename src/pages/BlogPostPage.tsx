import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { Blog } from "../types/blog";
import { format } from "date-fns";
import { FaHeart, FaRegHeart, FaShareAlt, FaCommentDots, FaUserPlus } from "react-icons/fa";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Img from "../assets/images/image7.jpg";
// BlogPostPage.tsx
import '../assets/styles/BlogPostPage.css';


const BlogPostPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [liked, setLiked] = useState(false);
  const { id } = useParams();

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
      .on("postgres_changes", { event: "*", schema: "public", table: "blogs" }, fetchBlogs)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const post = blogs.find((b) => b.id === id);
  if (!post) return <p className="text-center mt-5">Post not found.</p>;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        className="position-relative text-white"
        style={{
          height: "60vh",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${Img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <div className="container h-100 d-flex flex-column justify-content-end pb-5" data-aos="fade-up">
          <h1 className="display-4 fw-bold">{post.title}</h1>
          <p className="text-light mb-1">
            {post.author_name} • {format(new Date(post.date), "MMMM d, yyyy")}
          </p>
          <p>
            <Link to="/" className="text-white fw-bold text-decoration-none fs-6">
              HOME
            </Link>
            &nbsp;&nbsp;|| &nbsp;&nbsp;
            <Link to="/blog" className="text-white fw-bold text-decoration-none fs-6">
              BLOG
            </Link>
          </p>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <div className="bg-white p-4 p-md-5 shadow-sm rounded-4" data-aos="fade-up">
              {/* Thumbnail */}
              <img
                src={post.thumbnail_url}
                alt={post.title}
                className="img-fluid rounded mb-4 w-100"
                style={{ maxHeight: "450px", objectFit: "cover" }}
              />

              {/* Content Body */}
              <div className="blog-body-styled" dangerouslySetInnerHTML={{ __html: post.body }} />

              {/* Action Buttons */}
              <div className="d-flex gap-3 mt-4 flex-wrap">
                <button className="btn btn-outline-danger" onClick={() => setLiked(!liked)}>
                  {liked ? <FaHeart /> : <FaRegHeart />} {liked ? "Unlike" : "Like"}
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  <FaShareAlt /> Share
                </button>
                <button className="btn btn-outline-primary" disabled>
                  <FaCommentDots /> Comment
                </button>
                <button className="btn btn-outline-dark" disabled>
                  <FaUserPlus /> Follow Author
                </button>
              </div>

              {/* Comments Section */}
              <div className="mt-5 border-top pt-4">
                <h5 className="fw-bold">Comments</h5>
                <p className="text-muted">Comment system coming soon…</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogPostPage;
