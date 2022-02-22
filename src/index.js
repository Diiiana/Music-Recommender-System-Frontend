import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/pages/welcome/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/pages/registration/Login';
import Register from './components/pages/registration/Register';
import GenrePreferences from './components/pages/registration/GenrePreferences';
import ArtistPreferences from './components/pages/registration/ArtistPreferences';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <App />}/>
        <Route path="/user/login" render={() => <Login />} />
        <Route path="/user/register" render={() => <Register />} />
        <Route path="/register/genres" render={() => <GenrePreferences />} />
        <Route path="/register/artists" render={() => <ArtistPreferences />} />
        {/* <Route path="/recommendations" render={() => <Recommendation />} /> */}
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
