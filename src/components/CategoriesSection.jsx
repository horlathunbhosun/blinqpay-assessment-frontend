import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const CategoriesSection = ({ categories, isFetching }) => {
  return (
    <div>
      <div>
        <h4 className="text-[28px] sm:text-[40px] font-medium">Categories</h4>
      </div>
      <div className="flex  gap-4" style={{ flexWrap: "wrap" }}>
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

        {!isFetching && (!categories || categories?.length == 0) && (
          <div>
            <p>No category found</p>
          </div>
        )}

        {!isFetching &&
          categories &&
          categories?.length !== 0 &&
          categories?.map((_) => (
            <Link key={_?.id} to={`/blog?category_id=${_?.id}`} className="">
              <button className="border border-[#33333340] text-[13px] min-w-[80px] sm:min-w-[100px] px-6 py-2 hover:bg-[#333] hover:text-white hover:cursor-pointer trans rounded-[30px] w-max">
                {_?.name}
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
