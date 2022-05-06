import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { useButtonStyles } from "../commons/Constants";
import { HOST } from "../commons/Hosts";
import ErrorMessage from "./ErrorMessage";

function CommentBox(songId) {
  const classes = useButtonStyles();
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState(null);
  const [openUnauthorizedModal, setOpenUnauthorizedModal] = useState(false);

  useEffect(() => {
    const getCommentsForSong = async () => {
      const { data } = await axios
        .get(HOST.backend_api + "songs/comments/" + songId.songId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch((error) => {});
      setComments(data);
    };
    const getLoggedUser = async () => {
      const { data } = await axios
        .get(HOST.backend_api + "users/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            setOpenUnauthorizedModal(true);
          }
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
          HOST.backend_api + "songs/comments/post/" + songId.songId,
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
      <ErrorMessage
        isOpen={openUnauthorizedModal}
        message="Your session has expired. Please login again."
      />
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
