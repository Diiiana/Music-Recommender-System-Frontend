import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const focusedColor = "black";
const useStyles = makeStyles((theme) => ({
  form: {
    borderRadius: "1em 1em 1em 1em",
    padding: "20px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  root: {
    "& label.Mui-focused": {
      color: focusedColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: focusedColor,
      },
    },
  },
}));

function CommentBox(songId) {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getCommentsForSong = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/songs/comments/" + songId.songId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setComments(data);
    };
    const getLoggedUser = async () => {
      const { data } = await axios.get("http://localhost:8000/api/users/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUser(data);
    };

    getCommentsForSong();
    getLoggedUser();
  }, [songId.songId]);

  const getComments = () => {
    if (comments !== null && comments.length !== 0) {
      return comments.map((comm) => {
        return (
          <div key={comm.id} className="border-2 px-2 rounded mb-2">
            <div id={comm.id} className="text-xs">
              From {comm.user.user_name} {String.fromCharCode(183)}{" "}
              {comm.timestamp}
            </div>
            <div id={comm.id} className="text-md">
              {comm.comment}
            </div>
            {comm.user.id === user.id && (
              <div className="w-full flex justify-end">
                <div>
                  <p className="w-1/2 text-red-600 hover:cursor-pointer">
                    delete
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      });
    } else {
      return (
        <div className="flex justify-center items-center text-center h-full text-gray-600">
          No comments
        </div>
      );
    }
  };

  function appendComment(e) {
    setValue(e.target.value);
  }

  const postComment = (e) => {
    if (value.length > 0) {
      axios
        .post(
          "http://localhost:8000/api/songs/comments/post/" + songId.songId,
          {
            comment: value,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((response) => {
          setComments(response.data);
          setValue("");
        });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-4/5 p-2 overflow-y-scroll">
        {comments === null || user === null ? (
          <LinearProgress color="inherit" />
        ) : (
          <div>{getComments()}</div>
        )}
      </div>
      <div className="flex items-center w-full">
        <div className="p-2 w-full flex flex-row ml-4 mr-4">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="text"
            label="comment"
            name="comment"
            value={value}
            autoFocus
            className={classes.root}
            onChange={(e) => appendComment(e)}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "white",
                      cursor: "cursor-pointer",
                      color: "black",
                    },
                  }}
                  onClick={(e) => postComment(e)}
                >
                  <SendIcon />
                </IconButton>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
