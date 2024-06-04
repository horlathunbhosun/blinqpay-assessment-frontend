import React from "react";
import EditorBox from "../../../../components/EditorBox";
import { toast } from "react-toastify";
import axios from "../../../../api/axios";
import useAuth from "../../../../hooks/useAuth";

const EditPost = ({
  editPostData,
  setEditPostData,
  isSubmitting,
  setIsSubmitting,
  editEditorContent,
  setEditEditorContent,
  selectedPostId,
}) => {
  const { auth, blogCategories } = useAuth();

  // FUNCTION: ADD SELECTED IMAGES TO POST IMAGE ARRAY
  const handleEditFileChange = (event) => {
    const files = Array.from(event.target.files);

    setEditPostData({ ...editPostData, images: files });
  };

  const {
    thumbnail,
    main_image,
    post_title,
    post_excerpt,
    images,
    category_id,
  } = editPostData ?? {};

  // FUNCTION: UPDATES POST
  async function updatePostFn(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const updateId = toast.loading("Updating post, please wait...");

    try {
      const response = await axios.post(
        `posts/update/${selectedPostId}`,
        {
          thumbnail,
          category_id,
          post_title,
          main_image,
          post_excerpt,
          images,
          post_content: editEditorContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "multipart/form-data",
            "Accept":"multipart/form-data"
          },
        }
      );

      toast.update(updateId, {
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
        setEditPostData({
          thumbnail: null,
          main_image: null,
          post_title: "",
          category_id: "",
          post_excerpt: "",
          images: [],
        });

        setEditEditorContent("");
        navigate("/dashboard/posts");
      }, 1300);
    } catch (error) {
      setIsSubmitting(false);
      toast.update(updateId, {
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
      <form onSubmit={updatePostFn}>
        <div className="mb-3">
          <label className="text-[13px]" htmlFor="">
            Post Title
          </label>
          <input
            className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
            type="text"
            value={editPostData?.post_title}
            onChange={(e) =>
              setEditPostData({
                ...editPostData,
                post_title: e.target.value,
              })
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
            value={editPostData?.post_excerpt}
            onChange={(e) =>
              setEditPostData({
                ...editPostData,
                post_excerpt: e.target.value,
              })
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
            value={editPostData?.category_id}
            onChange={(e) =>
              setEditPostData({
                ...editPostData,
                category_id: e.target.value,
              })
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
              setEditPostData({
                ...editPostData,
                main_image: e.target.files[0],
              })
            }
          />
          <a
            href={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
              editPostData?.main_image
            }`}
            target="_blank"
            className="underline mt-1"
          >
            View Image
          </a>
        </div>

        <div className="mb-3">
          <label className="text-[13px]" htmlFor="">
            Thumbnails
          </label>
          <input
            className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
            type="file"
            onChange={(e) =>
              setEditPostData({
                ...editPostData,
                thumbnail: e.target.files[0],
              })
            }
          />
          <a
            href={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
              editPostData?.thumbnail
            }`}
            target="_blank"
            className="underline mt-1"
          >
            View Image
          </a>
        </div>

        <div className="mb-3">
          <label className="text-[13px]" htmlFor="">
            Images (You can select multiple files)
          </label>
          <input
            className="border border-[#33333340] outline-none mt-1 block w-full p-3 rounded-[2px]"
            type="file"
            multiple
            onChange={handleEditFileChange}
          />

          <div className="mt-1">
            {editPostData?.images &&
              editPostData?.images?.map((file, index) => (
                <a
                  key={`image${index}${file}`}
                  href={file}
                  target="_blank"
                  className="underline mr-1"
                >
                  View Image {index + 1},
                </a>
              ))}
          </div>
        </div>
        <div className="mb-3">
          <label className="text-[13px]" htmlFor="">
            Post Content
          </label>
          <EditorBox
            value={editEditorContent}
            setValue={setEditEditorContent}
            placeholder="Enter post content"
          />
        </div>

        <div className="mt-10 mb-2">
          <button
            type="submit"
            className="w-full bg-[#333] text-white py-3 rounded-[5px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating post.." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
