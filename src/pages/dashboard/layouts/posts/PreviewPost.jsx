import React from "react";
import Skeleton from "react-loading-skeleton";
import WysiwygContent from "../../../../components/WysiwygContent";
import { Link } from "react-router-dom";

const PreviewPost = ({ isFetching, postData }) => {
  return (
    <div>
      {isFetching && (
        <div className="pb-12 w-[93%] sm:w-full mx-auto">
          <div className="text-center blog-header md:w-10/12 xl:w-8/12 2xl:w-[55%] mx-auto">
            <h4 className="uppercase text-[#B76E79] text-[13px] tracking-[0.5px]">
              <Skeleton width={100} />
            </h4>
            <h2 className="text-[26px] sm:text-[40px] lg:text-[50px] font-medium leading-[120%] mb-2">
              <Skeleton />
            </h2>
            <div className="sm:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto">
              <p className=" text-[15px] lg:text-[17px] text-[#33333390]">
                <Skeleton />
                <Skeleton style={{ width: "75%" }} />
              </p>
            </div>
          </div>

          <div className="blog-banner lg:h-[500px] border border-[#33333340] my-8">
            <Skeleton style={{ height: "100%" }} />
          </div>

          <div className="blog-content lg:w-10/12 xl:w-8/12 mx-auto text-[#33333380]">
            <div className="mb-3">
              <Skeleton count={3} />
              <Skeleton style={{ width: "35%" }} />
            </div>

            <div className="mb-3">
              <Skeleton count={2} />
              <Skeleton style={{ width: "65%" }} />
            </div>
          </div>
        </div>
      )}

      {!isFetching && (
        <div className="pb-12 w-[93%] sm:w-full mx-auto">
          <div>
            <Link to="../posts">
              <button className="px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px]">
                Go Back
              </button>
            </Link>
          </div>
          <div className="text-center blog-header md:w-10/12 xl:w-8/12 2xl:w-[55%] mx-auto mt-3">
            <h4 className="uppercase text-[#B76E79] text-[13px] tracking-[0.5px]">
              {postData?.post_category?.name}
            </h4>
            <h2 className="text-[26px] sm:text-[40px] lg:text-[50px] font-medium leading-[120%] mb-2">
              {postData?.post_title}
            </h2>
            <div className="sm:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto">
              <p className=" text-[15px] lg:text-[17px] text-[#33333390]">
                {postData?.post_excerpt}
              </p>
            </div>
          </div>

          <div className="blog-banner lg:h-[500px] border border-[#33333340] my-8">
            <img
              src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                postData?.post_main_image
              }`}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>

          <div className="blog-content lg:w-10/12 xl:w-8/12 mx-auto text-[#33333380]">
            <WysiwygContent content={postData?.post_content} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPost;
