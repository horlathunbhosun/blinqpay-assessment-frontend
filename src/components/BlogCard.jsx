import React from "react";
import BlogImg from "../assets/images/blog-card.png";
import Arrow from "../assets/images/arrow.svg";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  return (
    <div className="p-1 border border-[#33333340] rounded-[4px]">
      <div className="blog-img-box border border-[#33333340] h-[220px]">
        <img
          src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${post?.post_thumbnail}`}
          className="w-full h-full object-cover"
          alt="blog-card"
        />
      </div>
      <div className="p-3 pb-1">
        <div className="blog-content-box mb-3">
          <Link
            to={`/blog/${post?.post_slug}`}
            className="text-[22px] text-[#333]"
          >
            {post?.post_title}
          </Link>
          <p className="text-[15px] text-[#33333380] font-light min-h-[60px]">
            {post?.post_excerpt}
          </p>
        </div>

        <div className="blog-card-footer flex gap-2 justify-between items-center border-t-[1px] p-2 border-[#33333340]">
          <div className="flex gap-4 items-center text-[14px] text-[#33333399]">
            <p>{post?.post_author?.name}</p>
            <p>
              {new Date(post?.post_created_at).toLocaleString("en-us", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <Link to={`/blog/${post?.post_slug}`}>
              <img src={Arrow} alt="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
