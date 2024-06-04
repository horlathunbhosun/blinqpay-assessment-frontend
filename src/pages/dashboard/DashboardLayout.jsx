import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-[75vh] my-2 dashboard">
      <div className="flex flex-col lg:flex-row items-start w-[90%] lg:w-full xl:w-10/12 mx-auto gap-x-[10px]">
        <div className="lg:w-[250px] lg:min-h-[300px] p-3 pt-0 dashboard-side-nav">
          <div className="flex flex-wrap gap-x-3 lg:flex-col">
            <Link className="" to="/dashboard">
              <span className="py-1.5 sm:py-3 bg-[#33333380] w-full mb-3 text-[13px] min-w-[70px] sm:min-w-[130px] inline-flex lg:block px-2">
                Dashboard
              </span>
            </Link>
            <Link className="" to="/dashboard/posts">
              <span className="py-1.5 sm:py-3 bg-[#33333380] w-full mb-3 text-[13px] min-w-[70px] sm:min-w-[130px] inline-flex lg:block px-2">
                Posts
              </span>
            </Link>

            <Link className="" to="/dashboard/categories">
              <span className="py-1.5 sm:py-3 bg-[#33333380] w-full mb-3 text-[13px] min-w-[70px] sm:min-w-[130px] inline-flex lg:block px-2">
                Categories
              </span>
            </Link>
          </div>
        </div>
        <div className="flex-grow  bg-white min-h-[70vh] p-3 dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
