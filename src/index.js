import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/pages/welcome/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/registration/Login";
import ResetPassowrd from "./components/pages/registration/ResetPassowrd";
import ChangePassword from "./components/pages/registration/ChangePassword";
import Register from "./components/pages/registration/Register";
import GenrePreferences from "./components/pages/registration/GenrePreferences";
import ArtistPreferences from "./components/pages/registration/ArtistPreferences";
import SongPreferences from "./components/pages/registration/SongPreferences";
import Dashboard from "./components/pages/user/Dashboard";
import UserHistory from "./components/pages/user/History";
import ViewSong from "./components/pages/song/ViewSong";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <App />} />
        <Route path="/user/login" render={() => <Login />} />
        <Route path="/user/reset-password" render={() => <ResetPassowrd />} />
        <Route path="/user/changePassword/:id" render={() => <ChangePassword />}/> 
        <Route path="/user/register" render={() => <Register />} />
        <Route path="/register/genres" render={() => <GenrePreferences />} />
        <Route path="/register/artists" render={() => <ArtistPreferences />} />
        <Route path="/register/songs" render={() => <SongPreferences />} />
        <Route path="/dashboard" render={() => <Dashboard />} />
        <Route path="/history" render={() => <UserHistory />} />
        <Route path="/song/view/:id" render={() => <ViewSong />} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
