import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "../api/axios";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  logoutFn;
  async function logoutFn() {
    const id = toast.loading("Signing out, please wait...");

    try {
      const response = await axios.get(`auth/logout`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      const responseData = response?.data ?? {};

      setAuth({});

      toast.update(id, {
        render:
          responseData?.message ||
          responseData.data?.message ||
          "Logout Successful",
        type: "success",
        isLoading: false,
        autoClose: 1300,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1300);
    } catch (error) {
      toast.update(id, {
        render:
          error?.response?.data?.message ||
          error?.response?.message ||
          error?.response?.data?.errors[0] ||
          "Sorry, something went wrong.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }
  return (
    <nav>
      <div className="container mx-auto">
        <div className="w-[90%] lg:w-full xl:w-10/12 mx-auto flex flex-col sm:flex-row justify-center items-center sm:justify-between py-2 border-b-[1px] border-[#33333340]">
          <h4 className="text-[30px] italic">
            <Link to="/">MyBlog</Link>
          </h4>

          <div className="flex items-center  gap-3">
            {!auth ||
              (!auth?.token && (
                <>
                  <Link to="/register">
                    <button className="px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[70px] sm:min-w-[120px]">
                      Register
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="px-6 py-2 border bg-[#333] text-white border-[#33333340] rounded-[2px] text-[13px] min-w-[70px] sm:min-w-[120px]">
                      Login
                    </button>
                  </Link>
                </>
              ))}

            {auth && auth?.token && (
              <>
                <button
                  onClick={() => logoutFn()}
                  className="px-6 py-2 border bg-[#333] text-white border-[#33333340] rounded-[2px] text-[13px] min-w-[70px] sm:min-w-[120px]"
                >
                  Logout
                </button>
                <Link to="/dashboard">
                  <button className="px-6 py-2 border bg-[#333] text-white border-[#33333340] rounded-[2px] text-[13px] min-w-[70px] sm:min-w-[120px]">
                    Go to dashboard
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
