import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserNavbar from "../../commons/UserNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
  },
}));

function ViewPlaylist() {
  const history = useHistory();
  const playlistId = useParams();
  const classes = useStyles();
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/playlists/view/" + playlistId.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setPlaylist(response.data);
      });
  }, []);

  const removeSongFromPlaylist = (e) => {
    axios
      .delete(
        "http://localhost:8000/api/users/playlists/delete-song/" +
          playlistId.id +
          "/" +
          e.target.song_id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        setPlaylist(response.data);
      });
  };

  const displayPlaylist = () => {
    if (playlist !== undefined && playlist.songs.length > 0) {
      const s = playlist.songs;
      return s.map((song) => {
        return (
          <div
            key={song.id}
            className="text-white grid grid-cols-2 h-56 md:w-92 lg:w-88 text-center ml-32 mb-2 mt-2"
          >
            <Card
              style={{
                color: "white",
                background:
                  "linear-gradient(rgba(40, 40, 40, 0.85), rgba(40, 40, 40, 0.85)), url(data:image/png;base64," +
                  song.image,
                backgroundSize: "cover",
              }}
            >
              <CardHeader
                title={song.song_name}
                subheader={
                  <Typography sx={{ color: "white" }}>
                    {song.artist.name}
                  </Typography>
                }
                action={
                  <IconButton
                    id={song.id}
                    className={classes.root}
                    onClick={(e) => {
                      removeSongFromPlaylist({
                        target: {
                          song_id: song.id,
                        },
                      });
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                }
              />
            </Card>
          </div>
        );
      });
    }
  };

  return (
    <div className="w-full h-screen bg-[#2c90ac] overflow-y-scroll">
      <UserNavbar title="Playlists" />
      <div className="pt-16 w-full h-screen">{displayPlaylist()}</div>
    </div>
  );
}

export default ViewPlaylist;
