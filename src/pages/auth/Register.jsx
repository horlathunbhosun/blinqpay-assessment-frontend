import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
  });

  const { email, password, name, password_confirmation } = registerData;

  async function registerFn(e) {
    e.preventDefault();

    const id = toast.loading("Creating account, please wait...");

    if (!email || !password || !name || !password_confirmation) {
      toast.update(id, {
        render: "All fields are required",
        type: "warning",
        isLoading: false,
        autoClose: 1300,
      });
      return;
    }

    if (password !== password_confirmation) {
      toast.update(id, {
        render: "Password and the confirm password must be the same",
        type: "warning",
        isLoading: false,
        autoClose: 1300,
      });
      return;
    }

    try {
      const response = await axios.post(`auth/register`, registerData);
      const responseData = response?.data ?? {};
      alert(responseData?.message);

      toast.update(id, {
        render:
          responseData?.message ||
          responseData.data?.message ||
          "Account created successfully",
        type: "success",
        isLoading: false,
        autoClose: 1300,
      });

      setTimeout(() => {
        toast.update(id, {
          render: "Redirecting to login page, please wait...",
          type: "info",
          isLoading: false,
          autoClose: 1300,
        });
      }, 1400);

      // navigate to login after successful registration
      setTimeout(() => {
        navigate("/login");
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
      <div className="w-11/12 mx-auto">
        <div className="auth-card-header text-center">
          <h3 className="text-[24px] sm:text-[30px] font-bold">Register</h3>
          <p className="text-[13px] sm:text-[15px]">
            Create account to get started
          </p>
        </div>

        <div className="auth-card-body mt-4">
          <form onSubmit={registerFn}>
            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Name
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="text"
                value={name}
                onChange={(e) => {
                  setRegisterData({ ...registerData, name: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Email
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="text"
                value={email}
                onChange={(e) => {
                  setRegisterData({ ...registerData, email: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Password
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="password"
                value={password}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  });
                }}
              />
            </div>

            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Confrim Password
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="password"
                value={password_confirmation}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    password_confirmation: e.target.value,
                  });
                }}
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
                Already have an account?{" "}
                <Link to="/login" className="underline text-[#000]">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
