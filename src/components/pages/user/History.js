import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import UserNavbar from "../../commons/UserNavbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useHistory } from "react-router-dom";
import { HOST } from "../../commons/Hosts";
import ErrorMessage from "../../commons/ErrorMessage";

function UserHistory() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [listenedSongs, setListenedSongs] = useState([]);
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);

  const displayData = () => {
    return data.map((s) => {
      return (
        <div
          key={s.song.id}
          className="h-32 bg-gray-100 bg-cover rounded overflow-hidden flex mb-2 mt-2 mr-2 hover:cursor-pointer"
          onClick={(e) => pushSelectedSong(s.song.id)}
        >
          <div className="flex items-center w-1/3 lg:1/3">
            <div className="mx-2">
              <div className="border shadow-lg">
                <img
                  className="block flex-none bg-cover"
                  src={`data:image/jpeg;base64,${s.song.image}`}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="m-auto">
            <p>{s.song.song_name}</p>
            <p>By {s.song.artist.name}</p>
          </div>
        </div>
      );
    });
  };

  const pushSelectedSong = (id) => {
    history.push({
      pathname: "/song/view/" + id,
    });
  };

  const changeData = (id) => {
    if (id === "history") {
      setData(listenedSongs);
    } else {
      setData(likedSongs);
    }
  };

  function circleProgress(message, id, v) {
    return (
      <div
        id={id}
        className="h-32 w-32 text-center hover:cursor-pointer overflow-hidden flex items-center"
        onClick={(e) => changeData(id)}
      >
        <div className="w-full h-auto mr-4">
          <CircularProgressbarWithChildren
            value={v}
            styles={{
              path: {
                stroke: `rgba(250, 102, 119, ${v})`,
              },
              trail: {
                stroke: "#99A9A9",
              },
              text: {
                fill: "#black",
                fontSize: "16px",
              },
            }}
          >
            <div className="p-2">
              <strong>{v}</strong> {message}
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    );
  }

  useEffect(() => {
    axios
      .get(HOST.backend_api + "users/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setListenedSongs(response.data);
        setData(response.data);
        axios
          .get(HOST.backend_api + "users/liked", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            setLikedSongs(response.data);
            axios
              .get(HOST.backend_api + "users/chart", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              })
              .then((response) => {
                setChartData(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            if (error.response.status === 401) {
              setOpenUnauthorizedModal(true);
            }
          });
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log(" AAAAAAAAAAAA")
          setOpenUnauthorizedModal(true);
        }
      });
  }, []);

  return (
    <div className="h-screen w-full bg-[#0e7490] overflow-y-scroll">
      <ErrorMessage
        isOpen={openUnauthorizedModal}
        message="Your session has expired. Please login again."
      />
      <UserNavbar title="History" />
      <div className="flex justify-center mx-4 pt-12 ml-24">
        <div id="listened-song">
          <div>{displayData()}</div>
        </div>
        <div
          id="user-status"
          className="w-auto h-4/5 bg-gray-100 lg:block xs:hidden sm:hidden md:hidden p-4 mt-2 ml-16 rounded-xl"
        >
          <div className="flex justify-center items-center">
            {circleProgress("listened songs", "history", listenedSongs.length)}
            {circleProgress("liked songs", "liked", likedSongs.length)}
          </div>
          <div className="text-sm mt-10">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="activity"
                stroke="black"
                strokeDasharray="3 4 5 2"
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHistory;
