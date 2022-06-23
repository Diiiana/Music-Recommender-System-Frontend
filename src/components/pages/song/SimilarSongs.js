import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../../commons/UserNavbar";
import { HOST } from "../../commons/Hosts";
import { useHistory } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

function SimilarSongs(props) {
  const songId = useParams();
  const history = useHistory();
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    const getSongs = async () => {
      await axios
        .get(HOST.backend_api + "recommendations/similar/" + songId.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          const recommendedSongs = response.data;
          setSongs(recommendedSongs);
        });
    };
    getSongs();
  }, [songId.id]);

  const displaySongs = () => {
    return songs.map((s) => {
      return (
        <div
          key={s.id}
          style={{
            color: "white",
            background:
              "linear-gradient(rgba(40, 40, 40, 0.85), rgba(40, 40, 40, 0.85)), url(data:image/png;base64," +
              s.image,
            backgroundSize: "cover",
          }}
          className="text-center rounded lg:w-44 lg:h-44 md:w-44 md:h-44
          xs:w-40 xs:h-40 hover:cursor-pointer mt-1"
          onClick={(e) => {
            history.push({
              pathname: "/song/view/" + s.id,
            });
          }}
        >
          <div className="pt-10">{s.song_name}</div>
          <div className="pt-2">By <p className="font-bold">{s.artist.name}</p></div>
        </div>
      );
    });
  };
  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#2c90ac]">
      <UserNavbar title="Similar Songs" />
      {songs === null ? (
        <div className="mt-12">
          <LinearProgress color="inherit"/>
        </div>
      ) : (
        <div
          className="pt-12 grid xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 
      lg:grid-cols-7 lg:mx-2"
        >
          {displaySongs()}
        </div>
      )}
    </div>
  );
}

export default SimilarSongs;
