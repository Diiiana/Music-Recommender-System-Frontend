import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import axios from "axios";
import { useButtonWhiteStyles } from "../../commons/Constants";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { HOST } from "../../commons/Hosts";

function GenrePreferences() {
  const history = useHistory();
  const location = useLocation();
  const classes = useButtonWhiteStyles();

  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState(84);
  const [genres, setGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [searchedGenre, setSearchedGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function uniqueValues(l) {
    var final = [];
    l.forEach((v) => {
      if (!(v in final)) {
        final.push(v);
      }
    });
    return final;
  }

  const redirect = () => {
    var sa = searchedGenre.map((el) => {
      return el.value;
    });

    var l = [...selectedGenre, ...sa];
    l = uniqueValues(l);
    if (l.length < 2) {
      handleOpen();
    } else {
      axios
        .post(HOST.backend_api + "tags/user", {
          userId: location.state.user,
          genres: l,
        })
        .then(function (response) {
          history.push({
            pathname: "/register/artists",
            state: {
              user: location.state.user,
              artists: response.data,
            },
          });
        });
    }
  };

  const handleClick = (event) => {
    var newColor = "white";
    var newBackground = "black";

    if (event.target.style.backgroundColor === "black") {
      newColor = "black";
      newBackground = "white";
      setSelectedGenre(selectedGenre.filter(id => id !== event.target.id))
    } else {
      if (event.target.id.length > 0) {
        setSelectedGenre([...selectedGenre, event.target.id]);
      }
    }
    event.target.style.backgroundColor = newBackground;
    event.target.style.color = newColor;
  };

  const loadMore = (e) => {
    const value = number + 20;
    setNumber(value);
  };

  const placeGenres = () => {
    return genres.slice(0, number).map((value) => {
      return (
        <button
          className="xs:h-24 xs:w-28 xl:h-28 xl:w-36 
          bg-white hover:bg-black hover:text-white rounded mb-1"
          id={value.id}
          onClick={handleClick}
          key={value.id}
        >
          {value.name}
        </button>
      );
    });
  };

  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios
        .get(HOST.backend_api + "tags")
        .catch(function (error) {
          console.log(error);
        });
      setGenres(data);
      const values = data.map(({ id, name }) => {
        return { label: name, value: id };
      });
      setAllGenres(values);
    };
    getGenres();
  }, []);

  return (
    <div className="bg-[#2c90ac] h-screen w-full flex flex-center overflow-hidden">
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <p className="bg-white rounded h-30 w-15 px-5 py-5">
          Please select at least two genres!
        </p>
      </Modal>
      <div className="w-full">
        <div
          className="bg-[#57728c]
          xl:w-[83rem]
      xs:h-[36rem]
      xl:h-[39rem] 
      px-5 py-5
      xs:mx-5 sm:mx-5 xl:mx-20 
      mt-8 shadow-2xl overflow-x-hidden overflow-y-scroll"
        >
          <div className="text-center">
            <p className="text-white w-full xs:text-xl mt-2 sm:text-xl md:text-2xl xl:text-3xl mb-2">
              What genres are you listening to?
            </p>
            <div className="flex justify-center items-center mt-4 mb-4">
              <Autocomplete
                multiple
                size="small"
                className={classes.root}
                style={{ width: "50vh" }}
                options={allGenres}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => setSearchedGenre(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Genre"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div
              className="grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8
          content-center"
            >
              {placeGenres()}
            </div>
            <div className="flex justify-center items-center mt-5">
              <Button onClick={loadMore}>
                <svg className="animate-bounce w-6 h-6">
                  <svg
                    className="w-6 h-6 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                  </svg>
                </svg>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-0 mr-5 float-right">
            <Button onClick={redirect}>
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
    </div>
  );
}

export default GenrePreferences;
