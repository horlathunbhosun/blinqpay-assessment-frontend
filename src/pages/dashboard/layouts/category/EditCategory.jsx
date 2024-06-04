import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TopCard from "../../../../components/TopCard";
import axios from "../../../../api/axios";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";

const EditCategory = () => {
  const { auth } = useAuth();
  const { category_id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [actionStatus, setActionStatus] = useState({
    isFetching: true,
    isUpdating: false,
  });

  const { isFetching, isUpdating } = actionStatus;

  async function getAllCategories() {
    setActionStatus({ ...actionStatus, isFetching: true });
    try {
      const res = await axios.get(`categories/all`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setAllCategories(res?.data?.data ?? []);

      setActionStatus({ ...actionStatus, isFetching: false });
    } catch (err) {
      console.log(err);
      setActionStatus({ ...actionStatus, isFetching: false });
    }
  }

  async function editCategoryFn(e) {
    e.preventDefault();

    const editId = toast.loading("Updating category, please wait...");

    if (!name) {
      toast.update(editId, {
        render: "Enter a category name",
        type: "warning",
        isLoading: false,
        autoClose: 1300,
      });
      return;
    }

    try {
      const response = await axios.patch(
        `categories/update/${category_id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = response?.data ?? {};

      toast.update(editId, {
        render:
          responseData?.message ||
          responseData?.data?.message ||
          "Category updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 1300,
      });

      setTimeout(() => {
        navigate("/dashboard/categories");
      }, 1400);
    } catch (error) {
      toast.update(editId, {
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

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const SELECTED_CATEGORY = allCategories?.find(
      (el) => el?.id === category_id
    );

    setName(SELECTED_CATEGORY?.name);
  }, [allCategories]);

  return (
    <div>
      <TopCard title="Edit Category" />
      <div className="content-box mt-3">
        <div className="text-start">
          <Link to="../categories">
            <button className="px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px]">
              Go Back
            </button>
          </Link>
        </div>

        <div className="mt-6">
          <form onSubmit={editCategoryFn}>
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
                className="w-full bg-[#333] text-white py-3 rounded-[5px] text-[13px]"
                disabled={isFetching || isUpdating}
              >
                {isUpdating ? "Updating.." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
