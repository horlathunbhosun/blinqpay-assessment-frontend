import React, { useEffect, useState } from "react";
import TopCard from "../../../components/TopCard";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";

const DashboardIndex = () => {
  const { auth } = useAuth();
  const [dashboardData, setDashboardData] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  async function getDashboardData() {
    setIsFetching(true);
    try {
      const res = await axios.get(`posts/count`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setDashboardData(res?.data?.data ?? {});
      setIsFetching(false);
    } catch (err) {
      console.log(err);
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div>
      <TopCard title="Dashboard" />

      <div className="content-box mt-3">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          <div>
            <div className="w-full border border-[#33333340] p-3">
              <h4>No of Posts</h4>
              <p className="text-[30px]">
                {isFetching && <Skeleton width={50} />}
                {(!isFetching && dashboardData?.posts_count) || "-"}
              </p>
            </div>
          </div>
          <div>
            <div className="w-full border border-[#33333340] p-3">
              <h4>No of Categories</h4>
              <p className="text-[30px]">
                {isFetching && <Skeleton width={50} />}
                {(!isFetching && dashboardData?.category_count) || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;
