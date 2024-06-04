import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../../api/axios";
import EditorBox from "../../../../components/EditorBox";
import TopCard from "../../../../components/TopCard";
import useAuth from "../../../../hooks/useAuth";
import PreviewPost from "./PreviewPost";
import EditPost from "./EditPost";

const DashboardPostDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [activeTab, setActiveTab] = useState("Preview");
  const [actionStatus, setActionStatus] = useState({
    isDeleting: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [postData, setPostData] = useState({});

  const [editPostData, setEditPostData] = useState({
    thumbnail: null,
    main_image: null,
    post_title: "",
    category_id: "",
    post_excerpt: "",
    images: [],
  });

  const [editEditorContent, setEditEditorContent] = useState("");

  // FUNCTION: FETCHES SINGLE BLOG POST DETAILS
  async function getSingleBlogDetailsFn() {
    setIsFetching(true);
    try {
      const res = await axios.get(`posts/show/${slug}`);
      console.log(res, "res");
      setPostData(res?.data?.data ?? {});

      const {
        post_title,
        post_excerpt,
        post_main_image,
        post_images,
        post_thumbnail,
        post_category,
        post_content,
        id,
      } = res?.data?.data ?? {};
      setSelectedPostId(id);

      setEditPostData({
        ...editPostData,
        post_title,
        post_excerpt,
        main_image: post_main_image,
        images: post_images,
        thumbnail: post_thumbnail,
        category_id: post_category?.id,
      });
      setEditEditorContent(post_content);
      setIsFetching(false);
    } catch (err) {
      console.log(err);
      setIsFetching(false);
    }
  }

  // FUNCTION: DELETES POST

  async function deletePostFn() {
    setActionStatus({ ...actionStatus, isDeleting: true });
    const deleteId = toast.loading("Deleting post, please wait...");

    try {
      const res = await axios.delete(`posts/delete/${selectedPostId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      toast.update(deleteId, {
        render:
          res?.data?.message ||
          res?.data?.data?.message ||
          "Post deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 1300,
      });
      setActionStatus({ ...actionStatus, isDeleting: false });
      setTimeout(() => {
        navigate("/dashboard/posts");
      }, 1400);
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
    getSingleBlogDetailsFn();
  }, []);
  return (
    <div>
      <TopCard title="Posts" />

      <div className="content-box mt-3">
        <div className="text-end ">
          {/* FUNCTION: Switches tabs i.e preview or edit */}
          {["Preview", "Edit Post"].map((el) => (
            <button
              key={el}
              onClick={() => setActiveTab(el)}
              className={`px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px] ml-2 ${
                activeTab === el && "bg-[#333] text-white trans"
              }`}
            >
              {el}
            </button>
          ))}
          <button
            onClick={() => deletePostFn()}
            className={`px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px] ml-2`}
          >
            Delete Post
          </button>
        </div>

        <>
          {activeTab === "Preview" ? (
            // Preview
            <PreviewPost isFetching={isFetching} postData={postData} />
          ) : (
            // Edit post
            <EditPost
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              editPostData={editPostData}
              setEditPostData={setEditPostData}
              editEditorContent={editEditorContent}
              setEditEditorContent={setEditEditorContent}
              selectedPostId={selectedPostId}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default DashboardPostDetails;
