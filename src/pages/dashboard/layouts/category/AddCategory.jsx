import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopCard from "../../../../components/TopCard";
import axios from "../../../../api/axios";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";

const AddCategory = () => {
  const { auth } = useAuth();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addCategoryFn(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const createId = toast.loading("Creating category, please wait...");

    if (!name) {
      toast.update(createId, {
        render: "Enter a category name",
        type: "warning",
        isLoading: false,
        autoClose: 1300,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `categories/create`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = response?.data ?? {};

      toast.update(createId, {
        render:
          responseData?.message ||
          responseData?.data?.message ||
          "Category created successfully",
        type: "success",
        isLoading: false,
        autoClose: 1300,
      });

      setIsSubmitting(false);
      setName("");

      setTimeout(() => {
        navigate("/dashboard/categories");
      }, 1300);
    } catch (error) {
      setIsSubmitting(false);
      toast.update(createId, {
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
    <div>
      <TopCard title="Add Category" />
      <div className="content-box mt-3">
        <div className="text-start">
          <Link to="../categories">
            <button className="px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px]">
              Go Back
            </button>
          </Link>
        </div>

        <div className="mt-6">
          <form onSubmit={addCategoryFn}>
            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Category Name
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-6 mb-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#333] text-white py-3 rounded-[5px]"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
