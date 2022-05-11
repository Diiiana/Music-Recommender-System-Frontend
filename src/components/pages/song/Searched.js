import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import UserNavbar from "../../commons/UserNavbar";

function Searched() {
  const history = useHistory();
  const location = useLocation();
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const val = location.state.songs;
    setSongData(val);
  }, [location.state]);

  function mapSongs() {
    return songData.map((s) => {
      return (
        <div
        key={s.id}
        className="grid grid-cols-4 mt-2 mb-2 shadow-lg hover:cursor-pointer hover:bg-gray-300"
        onClick={(e) => {
          history.push({
            pathname: "/song/view/" + s.id,
          });
        }}
      >
        <img
          className="block h-auto w-48 lg:w-48 flex-none bg-cover col-span-1 blur-sm hover:blur-0"
          src={`data:image/jpeg;base64,${s.image}`}
          alt=""
        />
        <div className="p-2 col-span-3 w-full">
          <p>{s.song_name}</p>
          <p>{s.artist.name}</p>
        </div>
      </div>
      );
    });
  }

  return (
    <div className="bg-[#2c90ac] h-screen w-full overflow-y-hidden">
      <UserNavbar title="Similar songs for" />
      {songData === null ? (
        <LinearProgress />
      ) : (
        <div className="h-[90vh] mt-16 overflow-y-scroll lg:mx-48 mx-16">{mapSongs()}</div>
      )}
    </div>
  );
}

export default Searched;
