import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserNavbar from "../../commons/UserNavbar";
import axios from "axios";

function Playlists() {
  const history = useHistory();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/playlists", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setPlaylists(response.data);
      });
  }, []);

  const displayPlaylists = () => {
    if (playlists.length === 0) {
      return <div>No playlists available</div>;
    } else {
      return playlists.map((playlist) => {
        return (
          <div
            key={playlist.id}
            className="xs:h-24 xs:w-24 sm:h-40 sm:w-40 lg:h-40 lg:w-40 bg-white rounded mx-1 flex justify-center items-center text-center
            hover:-rotate-[5deg] hover:scale-90 hover:cursor-pointer"
            onClick={(e) => {
              history.push("playlists/" + playlist.id);
            }}
          >
            <div className="grid grid-cols-1">
              <p>{playlist.name}</p>
              <p>({playlist.songs.length})</p>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className="w-full h-screen bg-[#2c90ac]">
      <UserNavbar title="Playlists" />
      <div
        className="pt-16 w-full h-screen grid xs:grid-cols-3 sm:grid-cols-4
      md:grid-cols-6 lg:grid-cols-8 lg:gap-1"
      >
        {displayPlaylists()}
      </div>
    </div>
  );
}

export default Playlists;
