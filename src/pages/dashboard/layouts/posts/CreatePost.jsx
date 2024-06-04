import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopCard from "../../../../components/TopCard";
import EditorBox from "../../../../components/EditorBox";
import axios from "../../../../api/axios";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { auth, blogCategories } = useAuth();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    thumbnail: null,
    main_image: null,
    post_title: "",
    category_id: "",
    post_excerpt: "",
    images: [],
  });

  const {
    thumbnail,
    main_image,
    post_title,
    post_excerpt,
    images,
    category_id,
  } = postData;

  const [editorContent, setEditorContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    setPostData({ ...postData, images: files });
  };

  async function createPostFn(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const createId = toast.loading("Creating post, please wait...");

    try {
      const response = await axios.post(
        `posts/create`,
        {
          thumbnail,
          main_image,
          post_title,
          post_excerpt,
          images,
          category_id,
          post_content: editorContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.update(createId, {
        render:
          response?.data?.message ||
          response?.data?.data?.message ||
          "Post created successfully",
        type: "success",
        isLoading: false,
        autoClose: 1300,
      });

      setIsSubmitting(false);
      setTimeout(() => {
        setPostData({
          thumbnail: null,
          main_image: null,
          post_title: "",
          category_id: "",
          post_excerpt: "",
          images: [],
        });

        setEditorContent("");
        navigate("/dashboard/posts");
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
      <TopCard title="Create Post" />

      <div className="content-box mt-3">
        <div className="text-start">
          <Link to="../posts">
            <button className="px-6 py-2 border border-[#33333340] rounded-[2px] text-[13px] min-w-[120px]">
              Go Back
            </button>
          </Link>
        </div>

        <div className="mt-6">
          <form onSubmit={createPostFn}>
            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Post Title
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="text"
                value={post_title}
                onChange={(e) =>
                  setPostData({ ...postData, post_title: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Post Excerpt
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="text"
                value={post_excerpt}
                onChange={(e) =>
                  setPostData({ ...postData, post_excerpt: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Post Category
              </label>
              <select
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px] bg-transparent"
                name=""
                id=""
                value={category_id}
                onChange={(e) =>
                  setPostData({ ...postData, category_id: e.target.value })
                }
              >
                <option value="" disabled>
                  --Choose--
                </option>
                {blogCategories?.map((el) => (
                  <option value={el?.id} key={el?.id}>
                    {el?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Post Main Image
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="file"
                onChange={(e) =>
                  setPostData({ ...postData, main_image: e.target.files[0] })
                }
              />
            </div>

            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Thumbnails
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="file"
                onChange={(e) =>
                  setPostData({ ...postData, thumbnail: e.target.files[0] })
                }
              />
            </div>

            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Images (You can select multiple files)
              </label>
              <input
                className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
                type="file"
                multiple
                onChange={handleFileChange}
              />

              <ul>
                {images?.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
            <div className="mb-3">
              <label className="text-[13px]" htmlFor="">
                Post Content
              </label>
              <EditorBox
                value={editorContent}
                setValue={setEditorContent}
                placeholder="Enter a message"
              />
            </div>

            <div className="mt-10 mb-2">
              <button
                type="submit"
                className="w-full bg-[#333] text-white py-3 rounded-[5px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating post.." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
