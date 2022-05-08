import React, { useEffect, useState } from "react";
import UserNavbar from "../../commons/UserNavbar";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorMessage from "../../commons/ErrorMessage";
import { HOST } from "../../commons/Hosts";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";
import { useButtonStyles } from "../../commons/Constants";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 2,
  width: "60vh",
  bgcolor: "white",
  overflowY: "scroll",
  overflowX: "hidden",
  maxHeight: "50vh",
};

function Preferences() {
  const classes = useButtonStyles();
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState(null);
  const [artists, setArtists] = useState(null);
  const [allTags, setAllTags] = useState(null);
  const [allArtists, setAllArtists] = useState(null);
  const [openArtists, setOpenArtists] = useState(false);
  const [openTags, setOpenTags] = useState(false);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);

  useEffect(() => {
    axios
      .get(HOST.backend_api + "users/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        axios
          .get(HOST.backend_api + "users/user/favorites", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            setTags(response.data.tags);
            setArtists(response.data.artists);
          })
          .catch(function (error) {
            if (error.response.status === 401) {
              setOpenUnauthorizedModal(true);
            }
          });
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
      });
  }, []);

  const deleteArtistFromFav = (e) => {
    axios
      .delete(HOST.backend_api + "users/artists/delete/" + e.target.artist_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setArtists(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
      });
  };

  const deleteTagFromFav = (e) => {
    axios
      .delete(HOST.backend_api + "users/tags/delete/" + e.target.tag_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setTags(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
      });
  };

  const getAllArtists = (e) => {
    axios
      .get(HOST.backend_api + "artists")
      .then((response) => {
        setAllArtists(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
      });
  };
  const showArtists = () => {
    return artists.map((art) => {
      return (
        <div
          key={art.id}
          className="hover:cursor-pointer bg-white rounded
          grid grid-cols-5 pl-4 pr-4"
        >
          <div className="flex items-center col-span-4">
            <p>{art.name}</p>
          </div>
          <div className="col-span-1">
            <IconButton
              onClick={(e) => {
                deleteArtistFromFav({
                  target: {
                    artist_id: art.id,
                  },
                });
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      );
    });
  };
  const getAllTags = (e) => {
    axios
      .get(HOST.backend_api + "tags")
      .then((response) => {
        setAllTags(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
      });
  };
  const showTags = () => {
    return tags.map((tag) => {
      return (
        <div
          key={tag.id}
          className="hover:cursor-pointer bg-white rounded
        grid grid-cols-5 pl-4 pr-4"
        >
          <div className="flex items-center col-span-4">
            <p>{tag.name}</p>
          </div>
          <div className="col-span-1">
            <IconButton
              onClick={(e) => {
                deleteTagFromFav({
                  target: {
                    tag_id: tag.id,
                  },
                });
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      );
    });
  };

  const handleClickArtist = (e) => {
    selectedArtists.push(e.target.name);
    setSelectedArtists(selectedArtists);
  };

  const handleClickTag = (e) => {
    selectedTags.push(e.target.name);
    setSelectedTags(selectedTags);
  };

  const displayArtists = () => {
    return allArtists.map((artist) => {
      return (
        <div key={artist.id}>
          <input
            type="checkbox"
            id={artist.id}
            name={artist.name}
            value={artist.name}
            onChange={(e) => {
              handleClickArtist({
                target: {
                  name: e.target.id,
                  value: e.target.checked,
                },
              });
            }}
          />
          {artist.name}
          <br />
        </div>
      );
    });
  };

  const displayTags = () => {
    return allTags.map((tag) => {
      return (
        <div key={tag.id}>
          <input
            type="checkbox"
            id={tag.id}
            name={tag.name}
            value={tag.name}
            onChange={(e) => {
              handleClickTag({
                target: {
                  name: e.target.id,
                  value: e.target.checked,
                },
              });
            }}
          />
          {tag.name}
          <br />
        </div>
      );
    });
  };

  const handleOpenAllArtist = () => {
    getAllArtists();
    setOpenArtists(true);
  };

  const handleOpenAllTags = () => {
    getAllTags();
    setOpenTags(true);
  };

  const saveNewArtists = () => {
    axios
      .post(
        HOST.backend_api + "users/artists/save",
        {
          artists: selectedArtists,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        setArtists(response.data);
        setOpenArtists(false);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
      });
  };

  const saveNewTags = () => {
    axios
      .post(
        HOST.backend_api + "users/tags/save",
        {
          tags: selectedTags,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        setTags(response.data);
        setOpenTags(false);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setOpenUnauthorizedModal(true);
        }
      });
  };

  return (
    <div className="w-full h-screen bg-cover bg-[#2c90ac] overflow-y-scroll">
      <ErrorMessage
        isOpen={openUnauthorizedModal}
        message="Your session has expired. Please login again."
      />
      <UserNavbar title="Preferences" />
      {user === null || artists === null || tags === null ? (
        <div className="w-full h-screen flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div>
          <div>
            <Modal
              open={openArtists}
              onClose={() => {
                setOpenArtists(false);
              }}
            >
              <Box sx={style}>
                {allArtists === null ? <LinearProgress /> : displayArtists()}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    saveNewArtists();
                  }}
                >
                  ADD
                </Button>
              </Box>
            </Modal>
          </div>
          <div>
            <Modal
              open={openTags}
              onClose={() => {
                setOpenTags(false);
              }}
            >
              <Box sx={style}>
                {allTags === null ? <LinearProgress /> : displayTags()}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    saveNewTags();
                  }}
                >
                  ADD
                </Button>
              </Box>
            </Modal>
          </div>
          <div className="grid grid-rows-2 pt-16 mx-8">
            <div>
              <p className="text-white">Your favorite artists:</p>
              <div className="w-full grid xs:grid-cols-2 lg:grid-cols-6 gap-1">
                {showArtists()}
              </div>
              <div>
                <IconButton
                  onClick={(e) => {
                    handleOpenAllArtist();
                  }}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </div>
            <div className="mt-16">
              <p className="text-white">Your favorite genres:</p>
              <div className="w-full grid xs:grid-cols-2 lg:grid-cols-6 gap-1">
                {showTags()}
              </div>
              <IconButton
                onClick={(e) => {
                  handleOpenAllTags();
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Preferences;
