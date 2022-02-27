import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Preferences() {
  const history = useHistory();
  const [displayedData, setDisplayedData] = useState();
  const [selectedGenre, setSelectedGenre] = useState([]);

  const redirect = () => {
    history.push({
      pathname: "/register/artists",
      state: { genres: selectedGenre },
    });
  };

  const handleClick = (event) => {
    var newColor = "white";
    var newBackground = "black";
    if (event.target.style.backgroundColor === "black") {
      newColor = "black";
      newBackground = "white";
    } else {
      selectedGenre.push(event.target.innerText);
      setSelectedGenre(selectedGenre);
    }
    event.target.style.backgroundColor = newBackground;
    event.target.style.color = newColor;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/genre")
      .then(function (response) {
        var receivedGenres = response.data;
        console.log(receivedGenres);
        var data = [];
        console.log(receivedGenres);
        receivedGenres.forEach(async (value) => {
          data.push(
            <button
              class="bg-white hover:bg-black hover:text-white"
              style={{
                margin: "1vh",
              }}
              onClick={handleClick}
              key={value.id}
            >
              <img
                src={`data:image/jpeg;base64,${value.image}`}
              />
            </button>
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
        maxHeight: "100vh",
        minHeight: "100vh",
        minWidth: "100vh",
        overflow: "hidden",
      }}
      class="bg-[#00788A] flex flex-center"
    >
      <div class="bg-[#00788A] grid grid-cols-4 items-center">
        {displayedData}
        <div class="h-24 w-64 relative cursor-pointer mb-5 ml-20">
          <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
          <div class="absolute inset-0 transform hover:skew-y-12 transition duration-300">
            <div class="h-full w-full bg-white rounded-lg shadow-2xl">
              <Button
                onClick={redirect}
                class="bg-white px-2 py-1 rounded hover:bg-black hover:text-white mt-2"
              >
                SELECT YOUR FAVORITE ARTISTS <br/>
                          AND <br/>
                       CONTINUE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;
