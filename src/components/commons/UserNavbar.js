import React, { useEffect, useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { HOST } from "../commons/Hosts";
import ErrorMessage from "./ErrorMessage";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

function UserNavbar(props) {
  const history = useHistory();
  const [showSideBar, setShowSideBar] = useState(false);
  const [user, setUser] = useState();
  const [searchedValue, setSearchedValue] = useState("");
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);

  const handleClick = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios
        .get(HOST.backend_api + "users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            setOpenUnauthorizedModal(true);
          }
        });
      setUser(data);
    };
    getUser();
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

  const handleSearchChange = (e) => {
    var value = e.target.value;
    setSearchedValue(value);
  };

  const searchValue = () => {
    axios
      .post(
        HOST.backend_api + "songs/search",
        {
          value: searchedValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        history.push({
          pathname: "/searched",
          state: {
            songs: response.data,
          },
        });
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
      });
  };
  return (
    <div className="w-full h-12 bg-[#2c90ac] fixed z-40">
      <ErrorMessage
        isOpen={openUnauthorizedModal}
        message="Your session has expired. Please login again."
      />
      <div className="w-full h-full px-2 flex justify-right items-center">
        <ul className="md:flex text-white cursor-pointer flex justify-right items-center">
          <li onClick={handleClick}>
            <MenuIcon className="w-5 mx-4" />
          </li>
          <li className="xs:text-sm sm:text-xs md:text-xl lg:text-xl">
            {props.title}
          </li>
        </ul>
        <div className="m-auto flex items-center">
          <div className="text-black">
            <input
              type="text"
              required
              name="search"
              value={searchedValue}
              onChange={(e) => {
                handleSearchChange(e);
              }}
              className="rounded px-2 py-1 mt-2 xs:w-32
                sm:xs:w-48 md:w-56 lg:w-64 "
              placeholder="Search..."
            />

            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "none",
                  cursor: "cursor-pointer",
                  color: "black",
                },
              }}
              onClick={(e) => searchValue()}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div>
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
            " w-screen max-w-[16rem] left-0 absolute bg-[#2c90ac] h-full shadow-xl" +
            (showSideBar ? " translate-x-0" : " -translate-x-0 ")
          }
        >
          <article className="text-white relative w-screen max-w-[16rem] pb-10 flex flex-col space-y-6 h-full divide-y">
            <div className="flex mt-5 ml-5 items-center hover:cursor-pointer">
              <Avatar {...stringAvatar()} />
              <header className="p-2 font-bold text-lg">
                {user ? user.user_name : "My profile"}
              </header>
            </div>
            <div className="w-full h-1/4">
              <div className="h-full grid grid-rows-4">
                <div
                  className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black"
                  onClick={(e) => history.push("/dashboard")}
                >
                  <p className="ml-5">Dashboard</p>
                </div>
                <div
                  className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black"
                  onClick={(e) => history.push("/discover")}
                >
                  <p className="ml-5">Discover</p>
                </div>
                <div
                  className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black"
                  onClick={(e) => history.push("/playlists")}
                >
                  <p className="ml-5">Playlists</p>
                </div>
                <div
                  className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black"
                  onClick={(e) => history.push("/history")}
                >
                  <p className="ml-5">History</p>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-rows-2 h-20">
                <div
                  className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black"
                  onClick={(e) => history.push("/preferences")}
                >
                  <p className="ml-5">Preferences</p>
                </div>
                <div
                  className="cursor-pointer h-full flex items-center hover:bg-slate-200 hover:text-black"
                  onClick={(e) => {
                    history.push("/logout");
                  }}
                >
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
