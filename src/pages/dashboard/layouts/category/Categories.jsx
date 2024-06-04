import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopCard from "../../../../components/TopCard";
import useAuth from "../../../../hooks/useAuth";
import axios from "../../../../api/axios";
import { toast } from "react-toastify";

const Categories = () => {
  const { auth } = useAuth();
  const [allCategories, setAllCategories] = useState([]);
  const [actionStatus, setActionStatus] = useState({
    isFetching: true,
    isDeleting: false,
  });

  const { isFetching, isDeleting } = actionStatus;

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

  async function deleteCategoryFn(ID) {
    setActionStatus({ ...actionStatus, isDeleting: true });
    const deleteId = toast.loading("Deleting category, please wait...");

    try {
      const res = await axios.delete(`categories/delete/${ID}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      toast.update(deleteId, {
        render:
          res?.data?.message ||
          res?.data?.data?.message ||
          "Category deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 1300,
      });
      setActionStatus({ ...actionStatus, isDeleting: false });
      setTimeout(() => {
        getAllCategories();
      }, 1000);
    } catch (error) {
      setActionStatus({ ...actionStatus, isDeleting: false });
      toast.update(deleteId, {
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

  return (
    <div>
      <TopCard title="Categories" />

      <div className="content-box mt-3">
        <div className="text-end">
          <Link to="add">
            <button className="px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px]">
              Add Category
            </button>
          </Link>
        </div>

        <div className="max-w-[100%]">
          <div
            class="table-responsive main-table my-3"
            style={{ maxWidth: "100%", overflow: "auto" }}
          >
            <table class="w-full">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isFetching && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Getting categories..
                    </td>
                  </tr>
                )}
                {!isFetching &&
                  (!allCategories || allCategories?.length === 0) && (
                    <tr>
                      <td colSpan={4} class="text-center">
                        No category found
                      </td>
                    </tr>
                  )}

                {!isFetching &&
                  allCategories &&
                  allCategories?.length !== 0 &&
                  allCategories?.map((el, i) => (
                    <tr key={el?.id}>
                      <td>{i + 1}</td>
                      <td class="capitalize">{el?.name}</td>
                      <td>
                        {" "}
                        {new Date(el?.created_at).toLocaleString("en-us", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                      </td>
                      <td>
                        <span className="flex gap-2 items-center justify-center">
                          <button
                            type="button"
                            onClick={() => deleteCategoryFn(el?.id)}
                          >
                            Delete
                          </button>
                          <Link to={`edit/${el?.id}`}>
                            <button>Edit</button>
                          </Link>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {allCategories && allCategories?.length >= 10 && (
            <div class="main-table-footer px-3">
              <div class="flex items-center justify-between">
                <div>
                  <p class="mb-0">Page 1 of 10</p>
                </div>
                <div class="flex gap-2 items-center">
                  <button>Previous</button>
                  <button>Next</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
