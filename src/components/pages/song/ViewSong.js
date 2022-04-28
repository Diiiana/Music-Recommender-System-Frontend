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
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { TextField } from "@mui/material";

const focusedColor = "black";

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
    height: 36,
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

function ViewSong(props) {
  const songId = useParams();
  const classes = useStyles();
  const history = useHistory();

  const [song, setSong] = useState("");
  const [isLiked, setIsLiked] = useState(-1);
  const [nameValue, setNameValue] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const [open, setOpen] = useState(false);
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useState(false);

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
        axios
          .get("http://localhost:8000/api/users/playlists", {
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
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
        console.log(error);
      });
  }, [songId.id]);

  const dislikeSong = () => {
    axios
      .get("http://localhost:8000/api/songs/user-dislike/id/" + songId.id, {
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
      .get("http://localhost:8000/api/songs/user-like/id/" + songId.id, {
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
        "http://localhost:8000/api/users/playlists/save/" + songId.id,
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
        "http://localhost:8000/api/users/playlists/new",
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
    <div>
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
                <AddBoxIcon /> <p className="xs:text-[4vw] sm:text-[2vw] md:text-[2vw]
                lg:text-[1vw]">CREATE</p>
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
        <div className="bg-[#2c90ac] to-black h-screen w-full col-span-3 mr-24">
          <div className="bg-white h-screen text-black w-5/6 ml-10">
            <div
              className="rounded-lg overflow-hidden bg-transparent 
            top-1/4 left-1/2 w-full lg:h-2/3"
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
          </div>
        </div>
        <div className="w-full col-span-2 mt-10 overflow-y-scroll flex-right">
          <p className="p-2">For you:</p>
          <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border shadow-lg">
            {/* <img
              class="block h-auto w-full lg:w-48 flex-none bg-cover"
              src="https://images.pexels.com/photos/1302883/pexels-photo-1302883.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            /> */}
            <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex justify-left">
              <div class="text-black font-bold text-xl mb-2 leading-tight">
                ceva piesa si ceva artist
              </div>
            </div>
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
