import React from "react";
import useAuth from "../hooks/useAuth";

const TopCard = ({ title }) => {
  const { auth } = useAuth();
  return (
    <div className="top-menu min-h-[50px] border border-[#33333340] flex justify-between gap-3 items-center p-1 px-3">
      <h1>{title}</h1>
      <div className="text-end">
        <p className="text-[14px] font-bold mb-0 tracking-[0.8px]">
          {auth?.name}
        </p>
        <p className="text-[12px] text-[#33333340]">{auth?.email}</p>
      </div>
    </div>
  );
};

export default TopCard;
