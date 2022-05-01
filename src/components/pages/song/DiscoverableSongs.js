import React, { useEffect, useState } from "react";
import { FiActivity } from "react-icons/fi";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { RiAlbumFill } from "react-icons/ri";
import { BsArrowRightCircle } from "react-icons/bs";
import { GiFallingStar } from "react-icons/gi";
import { MdTimeline } from "react-icons/md";
import axios from "axios";

function DiscoverableSongs() {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  const [data, setData] = useState([]);
  const [active, setActive] = useState("");
  const [number, setNumber] = useState(7);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/songs/by-date", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setSongs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:8000/api/tags/popularity", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setActive("genres");
        setGenres(response.data);
        displayGenres(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:8000/api/artists/latest-popular", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setArtists(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const displaySongs = (values) => {
    const songData = values.slice(0, number).map((s) => (
      <td key={s.id}>
        <div
          style={{
            color: "white",
            background:
              "linear-gradient(rgba(40, 40, 40, 0.85), rgba(40, 40, 40, 0.85)), url(data:image/png;base64," +
              s.image,
            backgroundSize: "cover",
          }}
          className="text-center rounded lg:w-44 lg:h-44 md:w-44 md:h-44
          xs:w-40 xs:h-40"
        >
          <div className="pt-12">{s.song_name}</div>
          <div className="pt-2">{s.artist.name}</div>
        </div>
      </td>
    ));
    setData(songData);
  };

  const displayGenres = (values) => {
    const genreData = values.slice(0, number).map(
      (g) =>
        g.tags__name !== null && (
          <td key={g.tags__id}>
            <div
              className="flex items-center justify-center text-center rounded lg:w-44 lg:h-44 md:w-44 md:h-44
          xs:w-40 xs:h-40 bg-gray-600"
            >
              <div className="grid grid-rows-2 w-full">
                <div className="text-white">{g.tags__name}</div>
                <div className="text-white flex items-center text-center justify-center w-full">
                  <GiFallingStar size={20} />{" "}
                  <p className="mx-2">{g.popularity}</p>
                </div>
              </div>
            </div>
          </td>
        )
    );
    setData(genreData);
  };

  const displayArtists = (values) => {
    const artistData = values.slice(0, number).map((g) => (
      <td key={g.artist__id}>
        <div
          className="flex items-center justify-center text-center rounded lg:w-44 lg:h-44 md:w-44 md:h-44
          xs:w-40 xs:h-40 bg-gray-600"
        >
          <div className="grid grid-rows-3 w-full">
            <div className="text-white">{g.artist__name}</div>
            <div className="text-white flex items-center text-center justify-center w-full">
              <GiFallingStar size={20} /> <p className="mx-2">{g.popularity}</p>
            </div>
            <div className="text-white flex items-center text-center justify-center w-full">
              <MdTimeline size={20} /> <p className="mx-2">{g.release_date}</p>
            </div>
          </div>
        </div>
      </td>
    ));
    setData(artistData);
  };

  const loadMore = (e) => {
    const value = number + 5;
    setNumber(value);
    if (active === "songs") {
      displaySongs(songs);
    } else {
      if (active === "artists") {
        displayArtists(artists);
      } else {
        if (active === "genres") {
          displayGenres(genres);
        }
      }
    }
  };

  return (
    <div className="grid xs:grid-cols-2 lg:grid-cols-9 md:grid-cols-5 h-full text">
      <div className="bg-red max-w-32 lg:w-44 md:w-44 sm:w-24 h-full col-span-1 bg-transparent">
        <div className="grid grid-rows-3 w-full h-full">
          <div className="w-full h-full flex items-center">
            <button
              className="w-full h-1/2 flex items-center mx-2 bg-[#0e7490]
            hover:bg-gray-600"
            >
              <div className="ml-2 text-white">
                <RiAlbumFill size={20} />
              </div>
              <p
                onClick={(e) => {
                  setNumber(7);
                  displayGenres(genres);
                  setActive("genres");
                }}
                className="flex text-center justify-center w-full text-white"
              >
                Genres
              </p>
            </button>
          </div>

          <div className="w-full h-full flex items-center text-center">
            <button
              className="w-full h-1/2 flex items-center mx-2 bg-[#0e7490]
            hover:bg-gray-600"
            >
              <div className="ml-2 text-white">
                <RiCompassDiscoverLine size={20} />
              </div>
              <p
                onClick={(e) => {
                  setNumber(7);
                  displayArtists(artists);
                  setActive("artists");
                }}
                className="flex text-center justify-center w-full text-white"
              >
                Artists
              </p>
            </button>
          </div>

          <div className="w-full h-full flex items-center">
            <button
              className="w-full h-1/2 flex items-center mx-2 bg-[#0e7490]
            hover:bg-gray-600"
            >
              <div className="ml-2 text-white">
                <FiActivity size={20} />
              </div>
              <p
                onClick={(e) => {
                  setNumber(7);
                  displaySongs(songs);
                  setActive("songs");
                }}
                className="flex text-center justify-center w-full text-white"
              >
                Latest Songs
              </p>
            </button>
          </div>
        </div>
      </div>
      <div
        className="flex item-center ml-8 overflow-x-scroll 
      lg:col-span-8 md:col-span-4 xs:grid-cols-1"
      >
        <div className="flex item-center">
          <table>
            <tbody>{data !== null && <tr>{data}</tr>}</tbody>
          </table>
          <div
            onClick={loadMore}
            className="float-right mx-4 flex items-center hover:cursor-pointer"
          >
            <BsArrowRightCircle size={25} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverableSongs;
