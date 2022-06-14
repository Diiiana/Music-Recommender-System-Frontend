import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import StarIcon from "@mui/icons-material/Star";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import { HOST } from "../../commons/Hosts";

function SongPreferences() {
  const history = useHistory();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const pushSelectedSong = (el) => {
    const newData = data.map((d) => {
      if (d.id === el.target.id) {
        return {
          ...d,
          liked: !d.liked,
        };
      } else {
        return d;
      }
    });
    setData(newData);
    if (!(el.target.id in selectedSongs)) {
      setSelectedSongs((selectedSongs) => [...selectedSongs, el.target.id]);
    }
  };

  const redirect = () => {
    if (selectedSongs.length < 1) {
      handleOpen();
    } else {
      setIsLoading(true);
      axios
        .post(HOST.backend_api + "recommendations/", {
          songs: selectedSongs,
          userId: location.state.user,
        })
        .then(function (response) {
          setIsLoading(false);
          history.push({
            pathname: "/dashboard",
            state: {
              user: location.state.user,
              songs: response.data,
            },
          });
        });
    }
  };

  const getSongs = () => {
    return data.map((el) => {
      return (
        <div className="group object-contain" key={el.id}>
          <div className="image-container">
            <img 
            className="blur-[3px]"
            src={`data:image/jpeg;base64,${el.image}`} alt="" />
            <div
              id={el.id}
              onClick={(e) => {
                pushSelectedSong({
                  target: {
                    id: el.id,
                    style: e.target.style,
                    liked: el.liked,
                  },
                });
              }}
              className="relative text-xs"
            >
              {el.liked === false && (
                <StarIcon
                  sx={{
                    fontSize: "5vh",
                  }}
                />
              )}
              {el.liked === true && (
                <StarIcon
                  style={{ color: "yellow" }}
                  sx={{
                    fontSize: "5vh",
                  }}
                />
              )}
            </div>
          </div>
          <div className="p-2">
            <h3 className="text-white py-1 text-base justify-center">
              {el.song}
            </h3>
            <p className="text-gray-400 text-sm">By {el.artist}</p>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    const val = location.state.songs;
    const dataReceived = val.map(({ id, song_name, artist, image }) => {
      return {
        id: id,
        song: song_name,
        artist: artist.name,
        image: image,
        liked: false,
      };
    });
    setData(dataReceived);
  }, [location.state.songs]);

  return (
    <div className="bg-[#2c90ac] w-full h-screen">
      {isLoading && <LinearProgress color="inherit" /> }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <p className="bg-white rounded h-30 w-15 px-5 py-5">
          Please select at least two songs!
        </p>
      </Modal>

      <div
        style={{
          padding: "1vh 2vh 0 2vh",
          color: "white",
          fontSize: "4vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <h3 className="text-2xl sm:text-2xl md:text-2xl text-gray-200 mt-5 mb-1">
            Top Songs For You
          </h3>
          <div
            className="p-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-2"
            style={{
              overflowX: "hidden",
              overflowY: "scroll",
              maxHeight: "80vh",
            }}
          >
            {getSongs()}
          </div>
        </div>
      </div>
      <button
        onClick={redirect}
        className="bg-white text-black rounded px-2 py-1 flex float-right mr-5 mt-2"
      >
        FINISH
      </button>
      {isLoading && 
      <Alert 
      sx={{width: "30%", float: "right"}}
      severity="info">Your account is getting ready!</Alert>}
    </div>
  );
}

export default SongPreferences;
