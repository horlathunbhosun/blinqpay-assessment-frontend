import React from "react";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";

const LatestPosts = ({ isFetching, posts }) => {
  return (
    <>
      <h4 className="section-title uppercase text-[#B76E79] text-[14px] tracking-[1px]">
        Latest posts
      </h4>
      <h2 className="text-[26px] sm:text-[40px] font-medium">
        Stay Trendy with Our Latest Insights
      </h2>

      {!isFetching && (!posts || posts?.length === 0) && (
        <div>
          <p>No post found</p>
        </div>
      )}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isFetching &&
          Array(3)
            .fill(0)
            .map((_, i) => <SkeletonCard key={`latest_card${i}`} />)}

        {!isFetching &&
          posts &&
          posts?.length !== 0 &&
          posts.map((el, i) => <BlogCard post={el} />)}
      </div>

      {!isFetching && posts && posts?.length > 3 && (
        <div className="mt-6 text-center">
          <Link to="/blog">
            <button className="px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px]">
              See more
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default LatestPosts;
