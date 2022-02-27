import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SongImage from "../../../assets/images/1.jpg";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function SongPreferences(props) {
  const history = useHistory();
  const location = useLocation();
  const [displayedData, setDisplayedData] = useState();
  const [selectedSongs, setSelectedSongs] = useState([]);

  const pushSelectedSong = (e, id) => {
    e.target.style.backgroundColor = "black";
    setSelectedSongs(selectedSongs => [...selectedSongs, id])
  };

  const redirect = () => {
    history.push({
      pathname: "/dashboard",
      state: { songs: selectedSongs },
    });
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/user/songs", {
        genres: location.state.selectedGenres,
        artists: location.state.selectedArtists,
      })
      .then(function (response) {
        const val = response.data;
        var data = [];
        val.forEach(async (re) => {
          data.push(
            <div id={re.song_id}>
              <div
                class="group object-contain"
                id={re.song_id}
                onClick={(e) => {
                  pushSelectedSong(e, re.song_id);
                }}
              >
                <img
                  id={re.song_id}
                  alt="Placeholder"
                  class="block h-32 w-48 rounded object-center object-contain"
                  src={SongImage}
                />
              </div>

              <div class="p-2">
                <h3 class=" text-black py-1 text-base justify-center">
                  {re.song_name}
                </h3>
                <p class="text-gray-400 text-sm">By {re.artist_name}</p>
              </div>
            </div>
          );
        });
        setDisplayedData(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, []);

  return (
    <div
      style={{
        maxHeight: "100vh",
        minHeight: "100vh",
        minWidth: "100vh",
        overflow: "hidden",
      }}
      class="bg-[#00788A]"
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
            {displayedData}
          </div>
        </div>
      </div>
      <Button 
      onClick={redirect}
      class="bg-white text-black rounded px-2 py-1">FINISH</Button>
    </div>
  );
}

export default SongPreferences;