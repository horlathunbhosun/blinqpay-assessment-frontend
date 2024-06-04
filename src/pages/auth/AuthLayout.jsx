import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="container mx-auto my-4">
      <div className="min-h-[80vh]  flex justify-center items-center w-full h-full">
        <div className="auth-card w-[90%] sm:w-8/12  md:w-7/12 lg:w-5/12 xl:w-4/12 2xl:w-[30%] rounded-[10px] mx-auto min-h-[300px] bg-white p-3 sm:p-5 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
