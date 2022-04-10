import React, { useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";

function UserNavbar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const handleClick = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className="w-full h-10 bg-[#0e7490] fixed z-40">
      <div className=" w-full h-full px-2 flex justify-right items-center">
          <ul className="hidden md:flex text-black cursor-pointer">
            <li onClick={handleClick}>
              <MenuIcon className="w-5 mx-4" />
            </li>
          </ul>
      </div>
      <div
        className={"fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0" +
          (showSideBar ? " transition-opacity opacity-100 duration-500" : "delay-500 opacity-0")}>
        <section
          className={
            " w-screen max-w-[16rem] left-0 absolute bg-[#0e7490] h-full shadow-xl" +
            (showSideBar ? " translate-x-0" : " -translate-x-0 ")
          }
        >
          <article className="relative w-screen max-w-[16rem] pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
            <header className="p-4 font-bold text-lg">Header</header>
            <p>cevas</p>
          </article>
        </section>
        <section
          className="w-screen h-full cursor-pointer"
          onClick={() => {
            setShowSideBar(false);
          }}
        ></section>
      </div>
    </div>
  );
}

export default UserNavbar;
