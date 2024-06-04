import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <div className="p-1 border border-[#33333340] rounded-[4px]">
      <div className="blog-img-box border border-[#33333340] h-[220px]">
        <Skeleton height={220} />
      </div>
      <div className="p-3 pb-1">
        <div className=" mb-3">
          <Skeleton style={{ width: "90%" }} />
          <p className="text-[15px] text-[#33333380] font-light min-h-[60px] mt-2">
            <Skeleton count={2} />
            <Skeleton style={{ width: "70%" }} />
          </p>
        </div>

        <div className="flex gap-2 justify-between items-center border-t-[1px] p-2 border-[#33333340]">
          <div className="flex gap-4 items-center text-[14px] text-[#33333399]">
            <p>
              <Skeleton style={{ width: "100px" }} />
            </p>
            <p>
              <Skeleton style={{ width: "70px" }} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
