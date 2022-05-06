import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import UserNavbar from "../../commons/UserNavbar";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { HOST } from "../../commons/Hosts";
import axios from "axios";
import ErrorMessage from "../../commons/ErrorMessage";

function ViewSongsFromGenre() {
  const genreId = useParams();
  const history = useHistory();
  const [songs, setSongs] = useState(null);
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);

  useEffect(() => {
    const getSongsFromGenre = async () => {
      const { data } = await axios
        .get(HOST.backend_api + "songs/genre/" + genreId.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            setOpenUnauthorizedModal(true);
          }
        });
      setSongs(data);
    };
    getSongsFromGenre();
  }, [genreId.id]);

  const getSongs = () => {
    if (songs !== null && songs.length > 0) {
      return songs.map((re) => {
        return (
          <div key={re.id}>
            <div
              className="group object-contain mx-1 hover:cursor-pointer"
              onClick={() => {
                history.push({
                  pathname: "/song/view/" + re.id,
                });
              }}
            >
              <img
                alt=""
                className="block h-32 w-full rounded object-center object-contain"
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
  };

  return (
    <div className="h-screen w-full bg-[#2c90ac] overflow-y-scroll">
      <ErrorMessage
        isOpen={openUnauthorizedModal}
        message="Your session has expired. Please login again."
      />
      <UserNavbar title="Songs" />
      {songs === null ? (
        <div className="w-full h-screen flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div
          className="px-2 grid pt-12
          grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 
          xl:grid-cols-6"
        >
          {getSongs()}
        </div>
      )}
    </div>
  );
}

export default ViewSongsFromGenre;
