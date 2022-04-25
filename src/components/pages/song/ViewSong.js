import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../../commons/UserNavbar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import Modal from "@mui/material/Modal";
import CommentBox from "../../commons/CommentBox";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

function ViewSong(props) {
  const songId = useParams();
  const [song, setSong] = useState("");
  const [isLiked, setIsLiked] = useState(-1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/songs/id/" + songId.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setSong(response.data.song);
        setIsLiked(response.data.liked.feedback);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <UserNavbar />
      <div class="grid-container grid grid-cols-5">
        <div className="bg-[#2c90ac] to-black h-screen w-full col-span-3 mr-24">
          <div className="bg-white h-screen text-black w-5/6 ml-10">
            <div
              className="rounded-lg overflow-hidden bg-transparent 
            top-1/4 left-1/2 w-full h-2/3"
            >
              <img
                className="w-full object-fill"
                src={`data:image/png;base64,${song.image}`}
                alt=""
              />
            </div>

            <div className="w-full mt-2 bg-transparent text-black rounded-lg shadow-lg overflow-hidden">
              <div className="mx-3">
                <h1>{song.song_name}</h1>
              </div>
              <div className="mx-3">
                {song.artist ? <h2>{song.artist.name}</h2> : <p></p>}
              </div>
              <div className="flex justify-between text-xs font-semibold text-gray-500 px-4 py-2">
                <div>0:00</div>
                <div className="flex space-x-3 p-2">
                  <button>
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="19 20 9 12 19 4 19 20"></polygon>
                      <line x1="5" y1="19" x2="5" y2="5"></line>
                    </svg>
                  </button>
                  <button className="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-gray-100">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                  <button>
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 4 15 12 5 20 5 4"></polygon>
                      <line x1="19" y1="5" x2="19" y2="19"></line>
                    </svg>
                  </button>
                </div>
                <div>3:00</div>
              </div>
            </div>
            <div>
              <IconButton sx={{ color: "black" }}>
                {isLiked === 1 ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </IconButton>
              <IconButton sx={{ color: "black" }}>
                {isLiked === 0 ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
              </IconButton>
              <IconButton sx={{ color: "black" }}>
                <PlaylistAddIcon />
              </IconButton>
              <IconButton className="float-right mr-5" onClick={handleOpen}>
                <CommentIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="w-full col-span-2 mt-10 overflow-y-scroll flex-right">
          <p className="p-2">For you:</p>
          <div class="flex flex-col lg:flex-row rounded h-auto lg:h-32 border shadow-lg">
            <img
              class="block h-auto w-full lg:w-48 flex-none bg-cover"
              src="https://images.pexels.com/photos/1302883/pexels-photo-1302883.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            />
            <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex justify-left">
              <div class="text-black font-bold text-xl mb-2 leading-tight">
                ceva piesa si ceva artist
              </div>
            </div>
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              className="flex justify-center items-center"
            >
              <div className="bg-white w-2/3 h-4/5">
                <CommentBox />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSong;
