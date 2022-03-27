import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import DashboardDrawer from '../../commons/DashboardDrawer';

function Dashboard(props) {
  const history = useHistory();
  const location = useLocation();
  const [displayedData, setDisplayedData] = useState();

  const pushSelectedSong = (id) => {
    history.push({
      pathname: "/song/view",
      state: { song: id },
    });
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/user/recommendations", {
        songs: location.state.songs,
      })
      .then(function (response) {
        const val = response.data;
        var data = [];
        console.log(val)
        val.forEach(async (re) => {
          console.log(re.image);
          console.log(re.id);
          data.push(
            <div id={re.song_id}>
              <div
                class="group object-contain"
                id={re.song_id}
                onClick={() => pushSelectedSong(re.id)}
              >
                <img
                  id={re.song_id}
                  alt=""
                  class="block h-32 w-48 rounded object-center object-contain"
                  src={`data:image/jpeg;base64,${re.image}`}
                />
              </div>

              <div class="p-2">
                <h3 class="text-white py-1 text-base justify-center">
                  {re.song_name}
                </h3>
                <p class="text-gray-400 text-sm">By {re.artist.name}</p>
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
          padding: "1vh 2vh 0 2vh",
          color: "white",
          fontSize: "4vh",
          display: "flex",
          minHeight: "100vh",
          background:"#0f0c29",  /* fallback for old browsers */
          background: "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)",  /* Chrome 10-25, Safari 5.1-6 */
          background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }}
      >
        <DashboardDrawer
        variant="persistent"
        anchor="left"
        class="w-4/12"
        />
        <div
        style={{justifyContent: "center",}}
        >
          <h3 class="text-2xl sm:text-2xl md:text-2xl font-bold text-gray-200 mb-5">
            Dashboard
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
  );
}

export default Dashboard;
