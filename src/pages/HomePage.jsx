import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import LatestPosts from "../components/LatestPosts";
import CategoriesSection from "../components/CategoriesSection";
import axios from "../api/axios";

const HomePage = () => {
  const URLs = [`posts/all`, `categories/all`];

  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [isFetching, setIsFetching] = useState(true);

  console.log(allPosts, allCategories);

  async function fetchPostsAndCategoriesFn() {
    setIsFetching(true);
    try {
      // mapping to transform the type array to get request
      const requests = URLs.map((url) => axios.get(`${url}`));

      // Promise.all to wait for all the GET requests to resolve
      const responses = await Promise.all(requests);

      // creating an array with the data from the responses
      const responseArr = responses.map((response) => response?.data?.data);
      console.log(responseArr, "res");
      if (responseArr) {
        setAllPosts(responseArr[0]);
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

  return (
    <div className="min-h-[80vh]">
      <section className="py-12">
        <div className="container mx-auto">
          <div className="w-[90%] lg:w-full xl:w-10/12 mx-auto ">
            <CategoriesSection
              isFetching={isFetching}
              categories={allCategories}
            />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto">
          <div className="w-[90%] lg:w-full xl:w-10/12 mx-auto ">
            <LatestPosts isFetching={isFetching} posts={allPosts} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
