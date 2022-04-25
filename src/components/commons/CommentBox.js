import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

const data = [
  { user: "username1", comment: "comm1", date: "2014-10-12" },
  { user: "username2", comment: "comm2", date: "2016-09-11"  },
  { user: "u3", comment: "co3", date: "2018-11-22"  },
];

function CommentBox() {
  const [value, setValue] = useState("");

  const getComments = () => {
    return data.map((comm) => {
      return (
        <div className="border-2 px-2 rounded mb-2">
          <div className="text-xs">From {comm.user} {String.fromCharCode(183)} {comm.date}</div>
          <div className="text-md">{comm.comment}</div>
        </div>
      );
    });
  };

  const postComment = () => {
    console.log(value);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-4/5 p-2">{getComments()}</div>
      <div>
        <div className="w-full p-2 flex flex-row">
          <TextField
            id="standard-basic"
            label="Comment"
            variant="standard"
            style={{ width: "95%" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={(e) => postComment()}>
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
