import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import BlogPosts from "./pages/BlogPosts.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import Categories from "./pages/dashboard/layouts/category/Categories.jsx";
import DashboardIndex from "./pages/dashboard/layouts/DashboardIndex.jsx";
import Posts from "./pages/dashboard/layouts/posts/Posts.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import "./assets/styles/main.scss";
import CreatePost from "./pages/dashboard/layouts/posts/CreatePost.jsx";
import AddCategory from "./pages/dashboard/layouts/category/AddCategory.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import EditCategory from "./pages/dashboard/layouts/category/EditCategory.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import RequireAuth from "./components/RequireAuth.jsx";
import DashboardPostDetails from "./pages/dashboard/layouts/posts/DashboardPostDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        {/* AUTH  */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="blog" element={<BlogPosts />} />
        <Route path="blog/:slug" element={<DetailsPage />} />
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index exact element={<DashboardIndex />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:slug" element={<DashboardPostDetails />} />
            <Route path="posts/create" element={<CreatePost />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route
              path="categories/edit/:category_id"
              element={<EditCategory />}
            />
          </Route>
        </Route>
      </Route>
      {/* DASHBOARD  */}
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SkeletonTheme baseColor="#ccc" highlightColor="#888">
        <RouterProvider router={router} />
      </SkeletonTheme>
    </AuthProvider>
  </React.StrictMode>
);
