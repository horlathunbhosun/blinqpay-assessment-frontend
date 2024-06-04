import React from "react";
import { Link } from "react-router-dom";
import Facebook from "../assets/images/facebook.svg";
import Youtube from "../assets/images/youtube.svg";
import Insta from "../assets/images/insta.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto">
        <div className="w-[90%] lg:w-full xl:w-10/12 mx-auto flex justify-between gap-3 py-4 border-t-2 border-[#33333340]">
          <h4 className="text-[30px] italic">MyBlog</h4>
          <div className="flex gap-5 items-center">
            <Link to="/">
              <img src={Facebook} alt="facebook" />
            </Link>

            <Link to="/">
              <img src={Insta} alt="facebook" />
            </Link>

            <Link to="/">
              <img src={Youtube} alt="facebook" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
