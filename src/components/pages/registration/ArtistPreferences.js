import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const focusedColor = "white";
const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: focusedColor,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: focusedColor,
      },
    },
  },
});

function Artists() {
  const location = useLocation();
  const [artists, setArtists] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [searchedArtists, setSearchedArtists] = useState([]);

  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event) => {
    var newColor = "white";
    var newBackground = "black";
    if (event.target.style.backgroundColor === "black") {
      newColor = "black";
      newBackground = "white";
    }
    event.target.style.backgroundColor = newBackground;
    event.target.style.color = newColor;

    const l = [...selectedArtists, ...searchedArtists];
    setSelectedArtists(l);

    history.push({
      pathname: "/register/songs",
      state: {
        selectedArtists: l,
        selectedGenres: location.state.genres,
      },
    });
  };

  const handleChange = (e) => {
    selectedArtists.push(e.target.name);
    setSelectedArtists(selectedArtists);
  };

  useEffect(() => {
    console.log(location.state.genres)
    axios
      .post("http://localhost:8000/api/artists/genre", {
        genres: location.state.genres
      })
      .then(function (response) {
        console.log(response.data)
        var receivedArtists = response.data;
        var artistsNames = [];
        receivedArtists.forEach(async (value) => {
          artistsNames.push(
            <div id={value[0]}>
              <input
                type="checkbox"
                id={value[0]}
                name={value[0]}
                value={value[0]}
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
        axios
          .get("http://localhost:8000/user/artists")
          .then(function (response) {
            var receivedArtists = response.data;
            const data = receivedArtists.map(({ id, name }) => {
              return { label: name, value: id }
            })
            console.log(data);
            setAllArtists(data);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  }, []);

  return (
    <div
      style={{
        background:"#0f0c29",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        minHeight: "100vh",
        minWidth: "100vh",
        overflow: "hidden",
      }}
    >
      <h1
        class="text-white text-center"
        style={{
          fontSize: "4vh",
        }}
      >
        Artists you might like
      </h1>
      <div
        style={{
          padding: "1vh 2vh 0 2vh",
          color: "white",
          fontSize: "2vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "5vh",
          height: "83vh",
        }}
      >
        <div
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: "80vh",
            width: "80vh",
            color: "white",
          }}
        >
          {artists}
        </div>
        <div
          style={{
            marginLeft: "20%",
            marginTop: "60px",
            lineColor: "white",
            color: "white",
            maxHeight: "30vh",
          }}
        >
          <Autocomplete
            multiple
            id="a"
            size="small"
            className={classes.root}
            style={{ width: "50vh" }}
            options={allArtists}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => setSearchedArtists(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ color: "white" }}
                label="Search Box"
                variant="outlined"
              />
            )}
          />
        </div>
      </div>

      <div>
        <Button
          class="rounded px-2 py-1"
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
