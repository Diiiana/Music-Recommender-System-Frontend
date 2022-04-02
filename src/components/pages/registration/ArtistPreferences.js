import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& label": {
      color: "black",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
      "& fieldset": {
        borderColor: "black",
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
    var sa = searchedArtists.map(el =>{
      return el.value;
    });
    
    const l = [...selectedArtists, ...sa];
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
    axios
      .post("http://localhost:8000/api/artists/genre", {
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
          .get("http://localhost:8000/api/artists")
          .then(function (response) {
            var receivedArtists = response.data;
            const data = receivedArtists.map(({ id, name }) => {
              return { label: name, value: id };
            });
            setAllArtists(data);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  }, []);

  return (
    <div className="bg-[#00788A] h-screen w-full">
      <div className="w-full flex justify-center items-center">
        <div className="bg-gray-200 xl:w-[83rem] mt-10 xs:h-[36rem] px-5 rounded-2xl overflow-x-hidden overflow-y-scroll">
          <div className="text-left">
            <div className="flex justify-center items-center mt-4">
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
                    label="Search Artist"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <p className="text-black bg-gray-200 w-full xs:text-xl mt-2 sm:text-xl md:text-2xl xl:text-3xl mb-2">
              Artists you might like
            </p>

            <div
              className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-3
              text-left mr-8"
            >
              {artists}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="mt-0 mr-5 float-right">
          <Button onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="white"
              className="bi bi-arrow-right-circle"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Artists;
