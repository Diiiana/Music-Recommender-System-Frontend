import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";

function GenrePreferences(props) {
  const history = useHistory();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const redirect = () => {
    console.log(selectedGenre);
    if (selectedGenre.length < 1) {
      handleOpen();
    } else {
      history.push({
        pathname: "/register/artists",
        state: { genres: selectedGenre },
      });
    }
  };

  const handleClick = (event) => {
    console.log("clicked");
    var newColor = "white";
    var newBackground = "black";

    if (event.target.style.backgroundColor === "black") {
      newColor = "black";
      newBackground = "white";
    } else {
      if ((event.target.id).length > 0) {
        console.log(event.target.id);
        selectedGenre.push(event.target.id);
        setSelectedGenre(selectedGenre);
      }
    }
    event.target.style.backgroundColor = newBackground;
    event.target.style.color = newColor;
  };

  const placeGenres = () => {
    return genres.map((value) => {
      return (
        <button
          class="bg-white hover:bg-black hover:text-white rounded"
          style={{
            margin: "1vh",
          }}
          id={value.id}
          onClick={handleClick}
          key={value.id}
        >
          {value.name}
          {/* <div
            style={{
              backgroundColor: "white",
              height: "100%",
              width: "100%",
              zIndex: "1",
              fontSize: "1vh"
            }}
          >
            <h4>{value.name}</h4>
          </div> */}
        </button>
      );
    });
  };

  useEffect(() => {
    if (genres.length === 0) {
      axios
        .get("http://localhost:8000/api/tags")
        .then((response) => {
          setGenres(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }
  }, [genres]);

  return (
    <div
      class="h-full w-full flex flex-center"
      style={{
        background: "#0f0c29" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(to right, #24243e, #302b63, #0f0c29)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        minHeight: "100vh",
        minWidth: "100vh",
        overflow: "hidden",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            backgroundColor: "white",
            width: "30vh",
            height: "15vh",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          class="rounded"
        >
          Please select at least two genres!
        </p>
      </Modal>

      <div
        style={{
          maxWidth: "80%",
          display: "flex",
          justifyContent: "center",
          maxHeight: "80%",
        }}
      >
        {genres.length === 0 ? (
          <div>
            <h3 class="text-3xl text-white animate-bounce text-center">
              Select your favorite genres
            </h3>
          </div>
        ) : (
          <div class="grid grid-cols-4 items-center"
          style={{
            maxHeight: "80%",
            overflow: "scroll"
          }}>
            {placeGenres()}
            <Button
              onClick={redirect}
              class="bg-white px-2 py-1 rounded hover:bg-black hover:text-white mt-2"
            >
              CONTINUE
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenrePreferences;
