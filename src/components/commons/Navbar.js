import React, { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-scroll";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const handleClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="w-screen h-10 bg-[#2c90ac] fixed z-40">
      <div className=" w-full h-full px-2 flex justify-center items-center">
        <div className="flex items-center">
          <ul className="hidden md:flex text-white cursor-pointer">
            <li>
              <Link to="home_page" smooth={true} offset={50} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link to="about_page" smooth={true} offset={50} duration={500}>
                About
              </Link>
            </li>
            <li>
              <Link to="services_page" smooth={true} offset={50} duration={500}>
                Services
              </Link>
            </li>
            <li>
              <Link
                to="footer_section"
                smooth={true}
                offset={50}
                duration={500}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:hidden" onClick={handleClick}>
          {!showMobileMenu ? (
            <MenuIcon className="w-5 mx-4" />
          ) : (
            <XIcon className="w-5 mx-4" />
          )}
        </div>
      </div>
      <ul
        className={
          !showMobileMenu
            ? "hidden"
            : "absolute bg-[#2c90ac] w-full p-8 text-black z-40"
        }
      >
        <li className="hover:bg-gray-200 cursor-pointer">
          <Link to="home_page" smooth={true} offset={50} duration={500}>
            Home
          </Link>
        </li>
        <li className="hover:bg-gray-200 cursor-pointer">
          <Link to="about_page" smooth={true} offset={50} duration={500}>
            About
          </Link>
        </li>
        <li className="hover:bg-gray-200 cursor-pointer">
          <Link to="services_page" smooth={true} offset={50} duration={500}>
            Services
          </Link>
        </li>
        <li className="hover:bg-gray-200 cursor-pointer">
          <Link to="footer_section" smooth={true} offset={50} duration={500}>
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
