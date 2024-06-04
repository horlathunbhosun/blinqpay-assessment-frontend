import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();

  useEffect(() => {
    setAuth({});
  }, []);

  // previous path is going to be the former location or empty string, this helps in redirection after authentication
  const from = location.state?.from?.pathname || "";

  const { email, password } = loginData;
  async function loginFn(e) {
    e.preventDefault();
    const id = toast.loading("Signing in, please wait...");

    if (!email || !password) {
      toast.update(id, {
        render: "All fields are required",
        type: "warning",
        isLoading: false,
        autoClose: 1300,
      });
      return;
    }

    try {
      const response = await axios.post(`auth/login`, loginData);
      const responseData = response?.data ?? {};

      const { email, name, token } = responseData?.data;
      setAuth({ email, name, token });

      toast.update(id, {
        render:
          responseData?.message ||
          responseData.data?.message ||
          "Login Successful",
        type: "success",
        isLoading: false,
        autoClose: 1300,
      });

      setTimeout(() => {
        toast.update(id, {
          render: "Redirecting to dashboard, please wait...",
          type: "info",
          isLoading: false,
          autoClose: 1300,
        });
      }, 1400);

      setTimeout(() => {
        if (!from) {
          navigate("/dashboard");
        } else {
          // user tried going to a page without authentication
          navigate(from, { replace: true });
        }
      }, 2800);
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
    <AuthLayout>
      <div className="w-11/12 mx-auto ">
        <div className="auth-card-header text-center">
          <h3 className="text-[24px] sm:text-[30px] font-bold">Login</h3>
          <p className="text-[13px] sm:text-[15px]">Sign in to continue</p>
        </div>

        <div className="auth-card-body mt-4">
          <form onSubmit={loginFn}>
            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Email
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                value={email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Password
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="text"
                value={password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>

            <div className="mt-6 mb-2">
              <button
                type="submit"
                className="w-full bg-[#333] text-white py-3 rounded-[5px]"
              >
                Submit
              </button>
            </div>
            <div className="text-center">
              <p className="text-[12px]">
                Don't have an account?{" "}
                <Link to="/register" className="underline text-[#000]">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
