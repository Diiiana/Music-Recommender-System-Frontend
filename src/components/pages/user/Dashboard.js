import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import UserNavbar from "../../commons/UserNavbar";
import { Button } from "@mui/material";
import { HOST } from "../../commons/Hosts";
import ErrorMessage from "../../commons/ErrorMessage";
import axios from "axios";

function Dashboard() {
  const history = useHistory();
  const location = useLocation();
  const [songData, setSongData] = useState([]);
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);

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
            className="group object-contain mx-1 hover:cursor-pointer"
            onClick={() => pushSelectedSong(re.id)}
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

  useEffect(() => {
    console.log("dashboard")
    if (location.state && location.state.songs) {
      const val = location.state.songs;
      setSongData(val);
    } else {
      axios
        .get(HOST.backend_api + `users/preferences`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          console.log(response.data)
          setSongData(response.data);
        })
        .catch(function (error) {
          console.log(error)
          if (error.response.status === 401) {
            setOpenUnauthorizedModal(true);
          }
        });
    }
  }, [location.state]);

  return (
    <div className="bg-[#2c90ac] h-screen w-full overflow-y-scroll">
      <ErrorMessage
        isOpen={openUnauthorizedModal}
        message="Your session has expired. Please login again."
      />
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
        <div className="flex justify-center items-center mt-10 mb-6">
          <Button
          // onClick={loadMore}
          >
            <svg className="animate-bounce w-6 h-6">
              <svg
                className="w-6 h-6 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
