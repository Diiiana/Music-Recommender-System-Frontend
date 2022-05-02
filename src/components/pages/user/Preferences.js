import React, { useEffect, useState } from "react";
import UserNavbar from "../../commons/UserNavbar";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function Preferences() {
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState(null);
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        axios
          .get("http://localhost:8000/api/users/user/favorites", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            setTags(response.data.tags);
            setArtists(response.data.artists);
          });
      });
  }, []);

  const showArtists = () => {
    try {
      return artists.map((art) => {
        return (
          <div key={art.id}>
            <p className="bg-white w-full rounded p-4">{art.name}</p>
          </div>
        );
      });
    } catch {
      return <div></div>;
    }
  };

  const showTags = () => {
    try {
      return tags.map((tag) => {
        return (
          <div key={tag.id}>
            <p className="bg-white w-full rounded p-4">{tag.name}</p>
          </div>
        );
      });
    } catch {
      return <div></div>;
    }
  };

  return (
    <div className="w-full h-screen bg-cover bg-[#2c90ac] overflow-y-scroll">
      <UserNavbar title="Preferences" />
      {user === null || artists === null || tags === null ? (
        <div className="w-full h-screen flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div>
          <div className="grid grid-rows-2 pt-16 mx-8">
            <div>
              <p className="text-white">Your favorite artists:</p>
              <div className="w-full grid xs:grid-cols-2 lg:grid-cols-6 gap-1">
                {showArtists()}
              </div>
            </div>
            <div className="mt-16">
              <p className="text-white">Your favorite genres:</p>
              <div className="w-full grid xs:grid-cols-2 lg:grid-cols-6 gap-1">
                {showTags()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Preferences;
