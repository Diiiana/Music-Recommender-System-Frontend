import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/pages/welcome/App";
import reportWebVitals from "./reportWebVitals";
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
import Discover from "./components/pages/user/Discover";

ReactDOM.render(
  <React.StrictMode>
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
        <Route extact path="/discover" render={() => <Discover />} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
