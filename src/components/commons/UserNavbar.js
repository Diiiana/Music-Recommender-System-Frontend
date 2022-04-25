import React, { useEffect, useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UserNavbar(props) {
  const history = useHistory();
  const [showSideBar, setShowSideBar] = useState(false);
  const [user, setUser] = useState();

  const handleClick = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const stringAvatar = () => {
    if (user !== undefined && user.user_name !== undefined) {
      return {
        sx: {
          bgcolor: "white",
          color: "black",
        },
        children: `${user.user_name[0][0]}`,
      };
    } else {
      return "";
    }
  };

  const showProfile = () => {
    
  }
  return (
    <div className="w-full h-10 bg-[#0e7490] fixed z-40">
      <div className=" w-full h-full px-2 flex justify-right items-center">
        <ul className="md:flex text-white cursor-pointer flex justify-right items-center">
          <li onClick={handleClick}>
            <MenuIcon className="w-5 mx-4" />
          </li>
          <li className="text-xl">{props.title}</li>
        </ul>
      </div>
      <div
        className={
          "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0" +
          (showSideBar
            ? " transition-opacity opacity-100 duration-500"
            : "delay-500 opacity-0")
        }
      >
        <section
          className={
            " w-screen max-w-[16rem] left-0 absolute bg-[#0e7490] h-full shadow-xl" +
            (showSideBar ? " translate-x-0" : " -translate-x-0 ")
          }
        >
          <article className="text-white relative w-screen max-w-[16rem] pb-10 flex flex-col space-y-6 overflow-y-scroll h-full divide-y">
            <div class="flex mt-5 ml-5 items-center hover:cursor-pointer" onClick={(e) => showProfile()}>
              <Avatar {...stringAvatar()} />
              <header className="p-2 font-bold text-lg">
                {user ? user.user_name : "My profile"}
              </header>
            </div>
            <div className="w-full h-1/4">
              <div className="h-full grid grid-rows-4">
                <div
                  className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black"
                  onClick={(e) => history.push("/")}
                >
                  <p className="ml-5">Dashboard</p>
                </div>
                <div className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black">
                  <p className="ml-5">Discover</p>
                </div>
                <div className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black">
                  <p className="ml-5">Playlists</p>
                </div>
                <div className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black">
                  <p className="ml-5" onClick={(e) => history.push("/history")}>
                    History
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-rows-2 h-20">
                <div className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black">
                  <p className="ml-5">Preferences</p>
                </div>
                <div className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black">
                  <p className="ml-5">Logout</p>
                </div>
              </div>
            </div>
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
