import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  overrides: {
    MuiInputLabel: {
      outlined: {
        ".MuiAutocomplete-root &:not(.MuiInputLabel-shrink)": {
          transform: "translate(14px, 12.5px) scale(1)",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "white",
          color: "white",
          borderText: "white",
        },
        "&:hover $notchedOutline": {
          borderColor: "white",
          color: "white",
          borderText: "white",
        },
        "&$focused $notchedOutline": {
          borderColor: "white",
          color: "white",
        },
      },
    },
    MuiAutocomplete: {
      inputRoot: {
        '&&[class*="MuiOutlinedInput-root"] $input': {
          padding: 1,
        },
      },
    },
  },
});

function Artists() {
  const location = useLocation();
  const [artists, setArtists] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);

  const history = useHistory();

  const redirect = () => {
    console.log(selectedArtists);
    console.log(location.state.genres);
    history.push({
      pathname: "/register/songs",
      state: {
        selectedArtists: selectedArtists,
        selectedGenres: location.state.genres,
      },
    });
  };

  const handleClick = (event) => {
    var newColor = "white";
    var newBackground = "black";
    if (event.target.style.backgroundColor === "black") {
      newColor = "black";
      newBackground = "white";
    }
    event.target.style.backgroundColor = newBackground;
    event.target.style.color = newColor;
    redirect();
  };

  const getAllArtists = async () => {
    await axios
      .get("http://localhost:8000/user/artists")
      .then(function (response) {
        var receivedArtists = response.data;
        receivedArtists.forEach(async (value) => {
          allArtists.push(value.name);
        });
        setAllArtists(allArtists);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    selectedArtists.push(e.target.name);
    setSelectedArtists(selectedArtists);
  }

  useEffect(() => {
    console.log(location.state.genres);
    axios
      .post("http://localhost:8000/artist/genre", {
        genres: location.state.genres,
      })
      .then(function (response) {
        var receivedArtists = response.data;
        var artistsNames = [];
        receivedArtists.forEach(async (value) => {
          artistsNames.push(
            <div id={value[0]}>              
              <input
                type="checkbox"
                id={value[0]}
                name={value[1]}
                value={value[0]}
                checked={console.log("check")}
                onChange={(e) => {
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked,
                    },
                  });
                }}
              />
              {value[1]}
              <br />
            </div>
          );
        });
        setArtists(artistsNames);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        getAllArtists();
      });
  }, []);

  return (
    <div 
    style={{ maxHeight: "100vh", minHeight: "100vh"}}
    class="bg-[#00788A] ">
      <div
        style={{
          padding: "1vh 2vh 0 2vh",
          color: "white",
          fontSize: "4vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p>Select your favorite music artists:</p>
        <div
          style={{
            marginLeft: "20%",
            marginTop: "60px",
            lineColor: "white",
            color: "white",
          }}
        >
          <ThemeProvider theme={theme}>
            <Autocomplete
              multiple
              id="a"
              size="small"
              style={{ width: 500 }}
              options={allArtists}
              renderInput={(params) => (
                <TextField {...params} label="Search Box" variant="outlined" />
              )}
            />
          </ThemeProvider>
        </div>
      </div>
      <div
        style={{
          padding: "1vh 8vh 0 2vh",
          overflowY: "scroll",
          overflowX: "hidden",
          maxHeight: "70vh",
          maxWidth: "80vh",
          color: "white",
        }}
      >
        {artists}
      </div>
      <div>
        <Button
          onClick={handleClick}
          style={{ backgroundColor: "white", color: "black", float: "right" }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Artists;
