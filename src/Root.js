import React from "react";
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
import SimilarSongs from "./components/pages/song/SimilarSongs";
import ViewSongsFromArtist from "./components/pages/song/ViewSongsFromArtist";
import ViewSongsFromGenre from "./components/pages/song/ViewSongsFromGenre";
import Discover from "./components/pages/user/Discover";
import Searched from "./components/pages/song/Searched";

function Root() {
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
        <Route exact path="/dashboard" render={() => <Dashboard />} />
        <Route exact path="/history" render={() => <UserHistory />} />
        <Route exact path="/playlists/:id" render={() => <ViewPlaylist />} />
        <Route exact path="/playlists" render={() => <Playlists />} />
        <Route exact path="/preferences" render={() => <Preferences />} />
        <Route exact path="/song/view/:id" render={() => <ViewSong />} />
        <Route exact path="/song/similar/:id" render={() => <SimilarSongs />} />
        <Route
          exact
          path="/song/genre/view/:id"
          render={() => <ViewSongsFromGenre />}
        />
        <Route
          exact
          path="/song/artist/view/:id"
          render={() => <ViewSongsFromArtist />}
        />
        <Route extact path="/discover" render={() => <Discover />} />
        <Route extact path="/searched" render={() => <Searched />} />
      </Switch>
    </Router>
  );
}

export default Root;
