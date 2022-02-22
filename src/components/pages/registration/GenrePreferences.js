import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


function Preferences() {
  const history = useHistory();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  const redirect = () => {
    history.push({
      pathname: "/register/artists",
      state: { 'genres': selectedGenre },
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
        var genreNames = [];
        receivedGenres.forEach(async (value) => {
          genreNames.push(value.name);
        });
        setGenres(genreNames);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#00788A",
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
      }}
      class="bg-[#00788A]"
    >
      <h1
      class="text-white text-2xl flex justify-center"
      >Select your favorite genres:</h1>
      <Grid
        container
        style={{
          paddingTop: "20vh",
          justifyContent: "center",
        }}
      >
        {genres.map((genre) => (
          <Button
            xs={6}
            class="bg-white w-20 h-10 rounded hover:bg-black hover:text-white mr-1"
            onClick={handleClick}
            key={genre}
          >
            {genre}
          </Button>
        ))}
      </Grid>
      <Button 
      onClick={redirect}
      class="bg-white px-2 py-1 rounded hover:bg-black hover:text-white mt-10">
        CONTINUE
      </Button>
    </div>
  );
}

export default Preferences;
