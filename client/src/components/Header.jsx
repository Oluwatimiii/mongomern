import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { currentUser } = useSelector((state) => state.user);
  const [mobileNav, setMobileNav] = useState(false);

  const openNav = () => {
    setMobileNav((prev) => !prev);
  };

  const navStyle = mobileNav
    ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/80"
    : "";

  return (
    // Larger Screens Nav
    <div
      className="w-full py-2 bg-[#0D0D2B] text-white fixed h-20 z-[10]"
      data-aos="fade-right"
      data-aos-easing="ease-in"
      data-aos-duration="600"
      data-aos-delay="100"
    >
      {/* Logo Div */}
      <div className="flex justify-between items-center w-full h-full max-w-[1200px] m-auto px-4 md:px-5 lg:px-6">
        <Link to="/">
          <p className="pl-4 md:text-[14px] text-1xl font-medium">MERN</p>
        </Link>

        {/* NavMenu Div */}
        <div className="hidden md:flex md:items-center">
          <div>
            <ul className="md:flex md:items-center md:pr-2 ld:pr-4">
              <li>
                <Link
                  to="/"
                  className="md:ml-6 ml-10 text-sm text-1xl hover:font-bold hover:text-[#3671E9]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="md:ml-6 ml-10 text-sm text-1xl hover:font-bold hover:text-[#3671E9]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="md:ml-6 ml-10 text-sm hover:font-bold hover:text-[#3671E9]"
                >
                  {currentUser ? "Profile" : "Sign In"}
                </Link>
              </li>

              {/*
              <li>
                <Link
                  to="/signout"
                  className="md:ml-6 ml-10 text-sm hover:font-bold hover:text-[#3671E9]"
                >
                  SignOut
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Menu Icon Div */}
        <div className="md:hidden" onClick={openNav}>
          <AiOutlineMenu size={25} color={"white"} />
        </div>
      </div>

      {/* Mobile Devices Nav */}
      <div className={navStyle}>
        <div
          className={
            mobileNav
              ? " fixed left-0 top-0 w-[100%] h-screen bg-[#0D0D2B] z-[1000] p-4 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-4 ease-in duration-500"
          }
        >
          <div>
            <div className="flex items-center justify-between w-full">
              <Link to="/">
                <div className="cursor-pointer">
                  <p className="pl-4 text-[18px] font-medium">MERN</p>
                </div>
              </Link>

              <div
                className="cursor-pointer z-[10] md:hidden p-4 text-white hover:text-[#031844] hover:bg-[#dce1eb] ease-in-out duration-200 rounded-full hover:shadow-md bg-[#031844] shad0w-white "
                onClick={openNav}
              >
                <AiOutlineClose size={25} />
              </div>
            </div>

            <div className="text-center flex flex-col items-center justify-center mt-20">
              <ul className="">
                <li className="mb-3">
                  <Link
                    to="/"
                    className="text-[24px] mb-10 hover:font-bold hover:text-[#3671E9]"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    to="/"
                    className="text-[24px] hover:font-bold hover:text-[#3671E9]"
                  >
                    About
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    to="/"
                    className="text-[24px] hover:font-bold hover:text-[#3671E9]"
                  >
                    Sign In
                  </Link>
                </li>
                {/* <li>
                <Link
                  to="/profile"
                  className="md:ml-6 ml-10 text-sm hover:font-bold hover:text-[#3671E9]"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/signout"
                  className="md:ml-6 ml-10 text-sm hover:font-bold hover:text-[#3671E9]"
                >
                  SignOut
                </Link>
              </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
