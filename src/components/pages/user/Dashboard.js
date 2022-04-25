import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import UserNavbar from "../../commons/UserNavbar";

function Dashboard() {
  const history = useHistory();
  const location = useLocation();

  const pushSelectedSong = (id) => {
    history.push({
      pathname: "/song/view/" + id,
    });
  };

  const getSongs = () => {
    const val = location.state.songs;
    return val.map((re) => {
      return (
        <div id={re.id}>
          <div
            className="group object-contain"
            id={re.id}
            onClick={() => pushSelectedSong(re.id)}
          >
            <img
              id={re.id}
              alt=""
              className="block h-32 w-48 rounded object-center object-contain"
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
  };

  return (
    <div className="bg-[#0e7490] h-screen w-full overflow-y-scroll">
      <UserNavbar title="Dashboard"/>
      <div style={{ justifyContent: "center" }}>
        <h3 className="text-2xl sm:text-2xl md:text-2xl font-bold text-gray-200 mb-5">
          Dashboard
        </h3>
        <div
          className="p-2 grid 
          grid-cols-1 xs:grid-cols-2 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-4 
          xl:grid-cols-8 gap-2"
        >
          {getSongs()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
