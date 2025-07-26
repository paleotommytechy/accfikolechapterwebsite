// FeaturedCard.tsx
import React from "react";
// import type { Blog } from "../../data/blogs";
import type { Blog } from "../../types/blog";
import { useNavigate } from "react-router-dom";

const FeaturedCard: React.FC<{ post: Blog }> = ({ post }) => {
  const nav = useNavigate();
  return (
    <div
      className="card text-white border-0 rounded-4 overflow-hidden mb-4 position-relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${post.thumbnail_url})`,
        backgroundSize: "cover",
        height: 260,
        cursor: "pointer",
      }}
      data-aos="zoom-in"
      onClick={() => nav(`/blog/${post.id}`)}
    >
      <div className="card-img-overlay d-flex flex-column justify-content-end">
        <h4 className=" fw-bold">{post.title}</h4>
        <p className="small mb-1">{post.body ? post.body.slice(0, 80) + "…" : ""}</p>

      </div>
    </div>
  );
};

export default FeaturedCard;
 