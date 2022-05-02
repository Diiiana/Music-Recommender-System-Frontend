import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import UserNavbar from "../../commons/UserNavbar";
import axios from "axios";

function Dashboard() {
  const history = useHistory();
  const location = useLocation();
  const [songData, setSongData] = useState([]);

  const pushSelectedSong = (id) => {
    history.push({
      pathname: "/song/view/" + id,
    });
  };

  function mapSongs() {
    return songData.map((re) => {
      return (
        <div key={re.id}>
          <div
            className="group object-contain mx-1"
            onClick={() => pushSelectedSong(re.id)}
          >
            <img
              alt=""
              className="block h-full w-full rounded object-center object-contain"
              src={`data:image/jpeg;base64,${re.image}`}
            />
          </div>

          <div className="p-2">
            <h3 className="text-white py-1 text-base justify-center">
              {re.song_name}
            </h3>
            <p className="text-gray-400 text-sm">By {re.artist.name}</p>
          </div>
        </div>
      );
    });
  }

  useEffect(() => {
    if (location.state && location.state.songs) {
      const val = location.state.songs;
      setSongData(val);
    } else {
      if (songData.length === 0) {
        axios
          .get(`http://localhost:8000/api/users/preferences`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            setSongData(response.data);
          })
          .catch((error) => {
            console.log(error.response.status)
          });
      }
    }
  }, []);

  return (
    <div className="bg-[#2c90ac] h-screen w-full overflow-y-scroll">
      <UserNavbar title="Dashboard" />
      <div style={{ justifyContent: "center" }}>
        <h3 className="text-2xl sm:text-2xl md:text-2xl font-bold text-gray-200 mb-5">
          Dashboard
        </h3>
        {songData.length !== 0 && (
          <div
            className="px-2 grid 
          grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 
          xl:grid-cols-6"
          >
            {mapSongs()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
