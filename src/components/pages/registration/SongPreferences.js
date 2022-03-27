import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

function SongPreferences(props) {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

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
    if(!(el.target.id in selectedSongs)) {
      setSelectedSongs((selectedSongs) => [...selectedSongs, el.target.id]);
    }
  };

  const redirect = () => {
    console.log(selectedSongs);
    history.push({
      pathname: "/dashboard",
      state: { songs: selectedSongs },
    });
  };

  const getSongs = () => {
    return data.map((el) => {
      return (
        <div class="group object-contain">
          <div className="image-container">
            <img src={`data:image/jpeg;base64,${el.image}`} alt="" />
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
              class="relative text-xs"
            >
              {el.liked == false && (
                <StarIcon
                sx={{
                  fontSize: "5vh"
                }}
                />
              )}

              {el.liked == true && (
                <StarIcon 
                style={{ color: "yellow" }}
                sx={{
                  fontSize: "5vh"
                }}
                />
              )}
            </div>
          </div>
          <div class="p-2">
            <h3 class="text-white py-1 text-base justify-center">{el.song}</h3>
            <p class="text-gray-400 text-sm">By {el.artist}</p>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/artists/songs", {
        genres: location.state.selectedGenres,
        artists: location.state.selectedArtists,
      })
      .then(function (response) {
        const val = response.data;
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
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, []);

  return (
    <div
      style={{
        background: "#0f0c29" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(to right, #24243e, #302b63, #0f0c29)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        minHeight: "100vh",
      }}
    >
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
          <h3 class="text-2xl sm:text-2xl md:text-2xl font-bold text-gray-200 mb-5">
            Top Beats
          </h3>
          <div
            class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-2"
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
      <Button onClick={redirect} class="bg-white text-black rounded px-2 py-1">
        FINISH
      </Button>
    </div>
  );
}

export default SongPreferences;
