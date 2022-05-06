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
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import CommentBox from "../../commons/CommentBox";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { TextField } from "@mui/material";
import { useButtonStyles } from "../../commons/Constants";
import { HOST } from "../../commons/Hosts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
  width: "45vh",
  bgcolor: "white",
};

function ViewSong(props) {
  const songId = useParams();
  const history = useHistory();
  const classes = useButtonStyles();

  const [song, setSong] = useState("");
  const [tagDisplay, sedTagDisplay] = useState([]);
  const [isLiked, setIsLiked] = useState(-1);
  const [nameValue, setNameValue] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const [open, setOpen] = useState(false);
  const [recommended, setRecommended] = useState(null);
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useState(false);

  useEffect(() => {
    axios
      .get(HOST.backend_api + "songs/id/" + songId.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setSong(response.data.song);
        setIsLiked(response.data.liked);
        if (
          response.data.song &&
          response.data.song.tags &&
          response.data.song.tags.length > 0
        ) {
          const d = response.data.song.tags.map((t) => {
            return (
              <p
                key={t.id}
                className="hover:cursor-pointer text-xs uppercase inline-block mx-1 mt-2 mb-2 p-1 bg-gray-200"
              >
                {t.name}
              </p>
            );
          });
          sedTagDisplay(d);
        }
        axios
          .get(HOST.backend_api + "users/playlists", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            setPlaylists(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
        console.log(error);
      });
    axios
      .get(HOST.backend_api + "recommendations/similar/" + songId.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        const recommendedSongs = response.data;
        setRecommended(recommendedSongs);
      });
  }, [songId.id]);

  const dislikeSong = () => {
    axios
      .get(HOST.backend_api + "songs/user-dislike/id/" + songId.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setIsLiked(0);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const likeSong = () => {
    axios
      .get(HOST.backend_api + "songs/user-like/id/" + songId.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setIsLiked(1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const playlistId = e.target.name;
    if (selectedPlaylists.indexOf(playlistId) === -1) {
      selectedPlaylists.push(playlistId);
      setSelectedPlaylists(selectedPlaylists);
    } else {
      selectedPlaylists.pop(playlistId);
      setSelectedPlaylists(selectedPlaylists);
    }
  };

  const saveSongInPlaylists = (e) => {
    axios
      .post(
        HOST.backend_api + "users/playlists/save/" + songId.id,
        {
          playlists: selectedPlaylists,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        setOpenPlaylistModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const displayPlaylists = () => {
    if (playlists.length !== 0) {
      return playlists.map((playlist) => {
        return (
          <div key={playlist.id}>
            <input
              type="checkbox"
              id={playlist.id}
              name={playlist.name}
              value={playlist.name}
              onChange={(e) => {
                handleChange({
                  target: {
                    name: e.target.id,
                    value: e.target.checked,
                  },
                });
              }}
            />
            {playlist.name}
            <br />
          </div>
        );
      });
    } else {
      return (
        <div className="text-gray-600 text-md mx-2">
          <p>No playlists available</p>
        </div>
      );
    }
  };
  const checkName = (e) => {
    var name = e.target.value;
    setNameValue({ ...nameValue, name });
  };

  const saveNewPlaylist = () => {
    axios
      .post(
        HOST.backend_api + "users/playlists/new",
        { playlistName: nameValue.name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        setPlaylists(response.data);
        setOpenCreatePlaylistModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className=" overflow-y-hidden">
      <div>
        <Modal
          open={openPlaylistModal}
          onClose={() => {
            setOpenPlaylistModal(false);
          }}
        >
          <Box sx={style}>
            <Typography>Your playlists</Typography>
            <div>{displayPlaylists()}</div>
            <div className="grid grid-cols-2">
              <IconButton
                sx={{
                  "&:hover": {
                    backgroundColor: "white",
                    cursor: "cursor-pointer",
                    color: "black",
                  },
                }}
                onClick={(e) => setOpenCreatePlaylistModal(true)}
              >
                <AddBoxIcon />{" "}
                <p
                  className="xs:text-[4vw] sm:text-[2vw] md:text-[2vw]
                lg:text-[1vw]"
                >
                  CREATE
                </p>
              </IconButton>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => {
                  saveSongInPlaylists();
                }}
              >
                Save
              </Button>
            </div>
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={openCreatePlaylistModal}
          onClose={() => {
            setOpenCreatePlaylistModal(false);
          }}
        >
          <Box sx={style}>
            <Typography>Create playlist</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoFocus
              onChange={(e) => checkName(e)}
              className={classes.root}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                saveNewPlaylist();
              }}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </div>

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
      <UserNavbar title="Listening now" />
      <div className="grid-container grid grid-cols-5">
        <div className="bg-[#2c90ac] to-black h-screen w-full col-span-3 mr-24  overflow-y-hidden">
          <div className="bg-white h-screen text-black w-5/6 ml-10">
            <div
              className="rounded-lg overflow-hidden bg-transparent 
            top-1/4 left-1/2 w-full lg:h-1/2"
            >
              <img
                className="w-full xs:object-cover lg:object-fill"
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
              <IconButton sx={{ color: "black" }} onClick={(e) => likeSong()}>
                {isLiked === 1 ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </IconButton>
              <IconButton
                sx={{ color: "black" }}
                onClick={(e) => dislikeSong()}
              >
                {isLiked === 0 ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
              </IconButton>
              <IconButton
                sx={{ color: "black" }}
                onClick={(e) => {
                  setOpenPlaylistModal(true);
                }}
              >
                <PlaylistAddIcon />
              </IconButton>
              <IconButton
                className="float-right mr-5"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <CommentIcon />
              </IconButton>
            </div>
            <hr />
            <div>
              <div className="mx-2 mt-2">Details</div>
              {tagDisplay}
            </div>
          </div>
        </div>
        <div className="w-full col-span-2 mt-10 flex-right overflow-y-scroll">
          {recommended === null && <LinearProgress color="inherit" />}
          <p className="p-2">For you:</p>
          <div className="h-4/5 lg:h-32">
            {recommended !== null &&
              recommended.map((s) => {
                return (
                  <div
                    key={s.id}
                    className="grid grid-cols-4 mt-2 mb-2 shadow-lg hover:cursor-pointer hover:bg-gray-50"
                    onClick={(e) => {
                      history.push({
                        pathname: "/song/view/" + s.id,
                      });
                    }}
                  >
                    <img
                      className="block h-auto w-48 lg:w-48 flex-none bg-cover col-span-1"
                      src={`data:image/jpeg;base64,${s.image}`}
                      alt=""
                    />
                    <div className="p-2 col-span-3 w-full">
                      <p>{s.song_name}</p>
                      <p>{s.artist.name}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              className="flex justify-center items-center"
            >
              <div className="bg-white w-2/3 h-4/5">
                <CommentBox songId={song.id} />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSong;
