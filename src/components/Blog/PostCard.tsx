// PostCard.tsx
import React from "react";
// import type { Blog } from "../../data/blogs";
import type { Blog } from "../../types/blog";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const PostCard: React.FC<{ post: Blog }> = ({ post }) => {
  const nav = useNavigate();
  return (
    <div
      className="card border-0 shadow-sm rounded-4 mb-0 h-100"
      style={{ cursor: "pointer" }}
      data-aos="fade-up"
      onClick={() => nav(`/blog/${post.id}`)}
    >
      <img src={post.thumbnail_url} className="card-img-top" alt={post.title} />
      <div className="card-body d-flex flex-column">
        <h6 className="fw-bold">{post.title}</h6>
        <p className="small flex-grow-1">{post.body.slice(0, 90)}…</p>
        <div className="d-flex align-items-center gap-3 mb-0">
          <img
            src={post.author_avatar_url}
            alt={post.author_name}
            className="rounded-circle"
            width={28}
            height={28}
          />
          <small className="text-muted">
            {post.author_name} • {format(new Date(post.date), "MMM d, yyyy")}
          </small>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
