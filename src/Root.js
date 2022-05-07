import React, { useEffect, useState } from "react";
import App from "./components/pages/welcome/App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/registration/Login";
import Logout from "./components/pages/registration/Logout";
import ResetPassowrd from "./components/pages/registration/ResetPassowrd";
import ChangePassword from "./components/pages/registration/ChangePassword";
import Register from "./components/pages/registration/Register";
import GenrePreferences from "./components/pages/registration/GenrePreferences";
import ArtistPreferences from "./components/pages/registration/ArtistPreferences";
import SongPreferences from "./components/pages/registration/SongPreferences";
import Dashboard from "./components/pages/user/Dashboard";
import Playlists from "./components/pages/user/Playlists";
import ViewPlaylist from "./components/pages/user/ViewPlaylist";
import UserHistory from "./components/pages/user/History";
import Preferences from "./components/pages/user/Preferences";
import ViewSong from "./components/pages/song/ViewSong";
import ViewSongsFromArtist from "./components/pages/song/ViewSongsFromArtist";
import ViewSongsFromGenre from "./components/pages/song/ViewSongsFromGenre";
import Discover from "./components/pages/user/Discover";
import { HOST } from "./components/commons/Hosts";
import axios from "axios";

function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getLoggedUser = async () => {
      await axios
        .get(HOST.backend_api + "users/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            setIsAuthenticated(false);
          }
        });
    };
    getLoggedUser();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <App />} />
        <Route exact path="/user/login" render={() => <Login />} />
        <Route exact path="/logout" render={() => <Logout />} />
        <Route
          exact
          path="/user/reset-password"
          render={() => <ResetPassowrd />}
        />
        <Route
          exact
          path="/user/changePassword/:id"
          render={() => <ChangePassword />}
        />
        <Route exact path="/user/register" render={() => <Register />} />
        <Route
          exact
          path="/register/genres"
          render={() => <GenrePreferences />}
        />
        <Route
          exact
          path="/register/artists"
          render={() => <ArtistPreferences />}
        />
        <Route
          exact
          path="/register/songs"
          render={() => <SongPreferences />}
        />
        <Route
          exact
          path="/dashboard"
          render={() => {
            return isAuthenticated ? <Dashboard /> : <Login />;
          }}
        />
        <Route
          exact
          path="/history"
          render={() => {
            return isAuthenticated ? <UserHistory /> : <Login />;
          }}
        />
        <Route
          exact
          path="/playlists/:id"
          render={() => {
            return isAuthenticated ? <ViewPlaylist /> : <Login />;
          }}
        />
        <Route
          exact
          path="/playlists"
          render={() => {
            return isAuthenticated ? <Playlists /> : <Login />;
          }}
        />
        <Route
          exact
          path="/preferences"
          render={() => {
            return isAuthenticated ? <Preferences /> : <Login />;
          }}
        />
        <Route
          exact
          path="/song/view/:id"
          render={() => {
            return isAuthenticated ? <ViewSong /> : <Login />;
          }}
        />
        <Route
          exact
          path="/song/genre/view/:id"
          render={() => {
            return isAuthenticated ? <ViewSongsFromGenre /> : <Login />;
          }}
        />
        <Route
          exact
          path="/song/artist/view/:id"
          render={() => {
            return isAuthenticated ? <ViewSongsFromArtist /> : <Login />;
          }}
        />
        <Route
          extact
          path="/discover"
          render={() => {
            return isAuthenticated ? <Discover /> : <Login />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default Root;
