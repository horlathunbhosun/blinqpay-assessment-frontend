import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "../api/axios";
import SkeletonCard from "../components/SkeletonCard";
import Skeleton from "react-loading-skeleton";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BlogPosts = () => {
  const URL_PARAMETERS = new URLSearchParams(window.location.search);
  const CATEGORY_ID = URL_PARAMETERS.get("category_id");
  const navigate = useNavigate();
  const location = useLocation();

  const URLs = [`posts/all`, `categories/all`];

  const [allPosts, setAllPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const [isFetching, setIsFetching] = useState(true);

  async function fetchPostsAndCategoriesFn() {
    try {
      // mapping to transform the type array to get request
      const requests = URLs.map((url) => axios.get(`${url}`));

      // Promise.all to wait for all the GET requests to resolve
      const responses = await Promise.all(requests);

      // creating an array with the data from the responses
      const responseArr = responses.map((response) => response?.data?.data);

      if (responseArr) {
        if (CATEGORY_ID && CATEGORY_ID !== "all") {
          setActiveCategory(CATEGORY_ID);
          const FILTERED_POST = responseArr[0]?.filter(
            (el) => el?.post_category?.id === CATEGORY_ID
          );

          setAllPosts(responseArr[0]);
          setFilteredPost(FILTERED_POST);
        } else {
          setActiveCategory("all");
          setAllPosts(responseArr[0]);
          setFilteredPost(responseArr[0]);
        }
        setAllCategories(responseArr[1]);
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
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
    URL_PARAMETERS.set("category_id", ID);

    navigate(`${location.pathname}?${URL_PARAMETERS.toString()}`);

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
      <div className="min-h-[1000px] py-12">
        <div className="container mx-auto">
          <div className="pb-12 w-[93%] sm:w-full mx-auto">
            <div className="w-[93%] lg:w-full xl:w-10/12 mx-auto">
              <Link to="/">
                <button className="px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px]">
                  Go Back
                </button>
              </Link>
            </div>

            <div className="text-center blog-header md:w-10/12 xl:w-8/12 2xl:w-[55%] mx-auto">
              <h4 className="uppercase text-[#B76E79] text-[13px] tracking-[0.5px]">
                POSTS
              </h4>
              <h2 className="text-[26px] sm:text-[40px] lg:text-[50px] font-medium leading-[120%] mb-2">
                Posts
              </h2>
              <div className="sm:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto">
                <p className=" text-[15px] lg:text-[17px] text-[#33333390]">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Velit, labore?
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="w-[93%] lg:w-full xl:w-10/12 mx-auto">
              <h4>Categories</h4>
              <div className="flex gap-2 mt-2 flex-wrap items-center">
                {isFetching && (
                  <div className="flex gap-3">
                    {Array(3)
                      .fill(0)
                      .map((el, i) => (
                        <div key={`category_skel${i}`}>
                          <Skeleton
                            width={80}
                            height={30}
                            className="!rounded-[30px]"
                          />
                        </div>
                      ))}
                  </div>
                )}

                {!isFetching &&
                  (!allCategories || allCategories?.length == 0) && (
                    <div>
                      <p>No category found</p>
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

          <div className="mt-8">
            <div className="w-[93%] lg:w-full xl:w-10/12 mx-auto">
              {!isFetching && (!filteredPost || filteredPost?.length === 0) && (
                <div>
                  <p>No post found</p>
                </div>
              )}

              <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {isFetching &&
                  Array(3)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={`blog_card${i}`} />)}

                {!isFetching &&
                  filteredPost &&
                  filteredPost?.length !== 0 &&
                  filteredPost.map((el, i) => <BlogCard post={el} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
