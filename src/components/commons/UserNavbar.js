import React, { useEffect, useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const focusedColor = "black";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
  width: 300,
  bgcolor: "white",
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    borderRadius: "1em 1em 1em 1em",
    padding: "20px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  root: {
    "& label.Mui-focused": {
      color: focusedColor,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: focusedColor,
      },
    },
  },
}));
function UserNavbar(props) {
  const history = useHistory();
  const classes = useStyles();
  const [showSideBar, setShowSideBar] = useState(false);
  const [user, setUser] = useState();
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);

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
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
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

  const showProfile = () => {};
  return (
    <div className="w-full h-10 bg-[#0e7490] fixed z-40">
      <div>
        <Modal open={openUnauthorizedModal}>
          <Box sx={style}>
            <Typography>
              Your session has expired. Please login again.
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                setOpenUnauthorizedModal(false);
                history.push({
                  pathname: "/user/login/",
                });
              }}
            >
              OK
            </Button>
          </Box>
        </Modal>
      </div>
      <div className="w-full h-full px-2 flex justify-right items-center">
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
          <article className="text-white relative w-screen max-w-[16rem] pb-10 flex flex-col space-y-6 h-full divide-y">
            <div
              className="flex mt-5 ml-5 items-center hover:cursor-pointer"
              onClick={(e) => showProfile()}
            >
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
