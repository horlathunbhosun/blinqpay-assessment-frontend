import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // auth from login
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("blog_auth")) || {};
  });
  const [blogCategories, setBlogCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("blog_categories")) || [];
  });

  // store auth in local storage whenever it is updated
  useEffect(() => {
    localStorage.setItem("blog_auth", JSON.stringify(auth));
    localStorage.setItem("blog_categories", JSON.stringify(blogCategories));
  }, [auth, blogCategories]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, blogCategories, setBlogCategories }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
