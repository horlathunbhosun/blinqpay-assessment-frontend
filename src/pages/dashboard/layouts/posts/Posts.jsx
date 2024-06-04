import React, { useEffect, useState } from "react";
import BlogCard from "../../../../components/BlogCard";
import { Link } from "react-router-dom";
import TopCard from "../../../../components/TopCard";
import axios from "../../../../api/axios";
import useAuth from "../../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "../../../../components/SkeletonCard";
import DashboardBlogCard from "../../../../components/DashboardBlogCard";

const Posts = () => {
  const { auth, setBlogCategories } = useAuth();
  const URLs = [`posts/all`, `categories/all`];

  const [allPosts, setAllPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const [actionStatus, setActionStatus] = useState({
    isFetching: true,
  });

  const { isFetching } = actionStatus;

  async function fetchPostsAndCategoriesFn() {
    try {
      // mapping to transform the type array to get request
      const requests = URLs.map((url) =>
        axios.get(`${url}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
      );

      // Promise.all to wait for all the GET requests to resolve
      const responses = await Promise.all(requests);

      // creating an array with the data from the responses
      const responseArr = responses.map((response) => response?.data?.data);
      console.log(responseArr, "res");
      if (responseArr) {
        setAllPosts(responseArr[0]);
        setFilteredPost(responseArr[0]);
        setAllCategories(responseArr[1]);
        setBlogCategories(responseArr[1]);
      }

      setActionStatus({ ...actionStatus, isFetching: false });
    } catch (error) {
      setActionStatus({ ...actionStatus, isFetching: false });
      console.log(
        error?.response?.data?.message ||
          error?.response?.message ||
          error?.response?.data?.errors[0] ||
          "something went wrong"
      );
    }
  }

  useEffect(() => {
    fetchPostsAndCategoriesFn();
  }, []);

  function filterPostByCategory(ID) {
    setActiveCategory(ID);
    const FILTERED_POST = allPosts?.filter(
      (el) => el?.post_category?.id === ID
    );
    if (ID === "all") {
      setFilteredPost(allPosts);
    } else {
      setFilteredPost(FILTERED_POST);
    }
  }
  return (
    <div>
      <TopCard title="Posts" />

      <div className="content-box mt-3">
        <div className="text-end">
          <Link to="create">
            <button className="px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px]">
              Add Post
            </button>
          </Link>
        </div>

        <>
          <div>
            <div>
              <h4>Categories</h4>
              <div className="flex gap-2 mt-2 flex-wrap items-center">
                {isFetching && (
                  <div className="flex gap-3">
                    {Array(3)
                      .fill(0)
                      .map((el, i) => (
                        <div key={`category_skel${i}`}>
                          <Skeleton
                            width={100}
                            height={40}
                            className="!rounded-[30px]"
                          />
                        </div>
                      ))}
                  </div>
                )}
                {!isFetching && allCategories && allCategories?.length > 1 && (
                  <button
                    className={`min-w-[80px] text-[13px] border border-[#33333340] py-1 rounded-[15px] ${
                      activeCategory === "all" && "bg-[#333] text-white trans"
                    }`}
                    onClick={() => filterPostByCategory("all")}
                  >
                    All
                  </button>
                )}
                {!isFetching &&
                  allCategories &&
                  allCategories?.length !== 0 &&
                  allCategories.map((el) => (
                    <button
                      key={el?.id}
                      onClick={() => filterPostByCategory(el?.id)}
                      className={`capitalize min-w-[80px] text-[13px] border border-[#33333340] py-1 rounded-[15px] px-3 ${
                        activeCategory === el?.id &&
                        "bg-[#333] text-white trans"
                      }`}
                    >
                      {el?.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isFetching &&
              Array(3)
                .fill(0)
                .map((_, i) => <SkeletonCard key={`blog_card${i}`} />)}

            {!isFetching &&
              allPosts &&
              filteredPost &&
              filteredPost?.length !== 0 &&
              filteredPost.map((el, i) => (
                <DashboardBlogCard key={el?.id} post={el} />
              ))}
          </div>

          <div>
            {!isFetching && (!filteredPost || filteredPost?.length === 0) && (
              <p>No post found</p>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default Posts;
