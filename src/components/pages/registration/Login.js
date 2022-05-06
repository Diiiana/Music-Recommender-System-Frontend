import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import avatar from "../../../assets/images/avatar.png";
import {
  Button,
  IconButton,
  InputAdornment,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import { useButtonStyles } from "../../commons/Constants";
import { HOST } from "../../commons/Hosts";

function Login() {
  const history = useHistory();
  const classes = useButtonStyles();
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePasswordChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const checkEmailAddress = (e) => {
    var email = e.target.value;
    setEmailValue({ ...emailValue, email });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailValue.email === undefined || emailValue.email.length < 5) {
      setEmailError("Email too short!");
    } else {
      if (values.password === undefined || values.password.length < 5) {
        setPasswordError("Password too short!");
      } else {
        setEmailError("");
        setPasswordError("");
        axios
          .post(HOST.backend_api + `users/login`, {
            email: emailValue.email,
            password: values.password,
          })
          .then((res) => {
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);

            axios
              .get(HOST.backend_api + `users/preferences`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              })
              .then((r) => {
                if (r.status === 200) {
                  history.push({
                    pathname: "/dashboard",
                    state: {
                      user: res.data.id,
                      songs: r.data,
                    },
                  });
                } else {
                  history.push({
                    pathname: "/register/genres",
                    state: {
                      user: res.data.id,
                    },
                  });
                }
              });
          })
          .catch((err) => {
            if (err.response.status === 401) {
              setPasswordError("Invalid data!");
            }
          });
      }
    }
  };

  return (
    <div className="bg-[#2c90ac] flex h-screen justify-center items-center">
      <div className="w-full max-w-md flex ">
        <form
          className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${classes.form}`}
          noValidate
        >
          <img src={avatar} alt="" />
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoFocus
              required
              onChange={(e) => checkEmailAddress(e)}
              className={classes.root}
            />
            <div style={{ color: "red" }}>{emailError}</div>
          </div>

          <div>
            <TextField
              required
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
              className={classes.root}
              type={values.showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              value={values.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                      className="hover:text-black"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ color: "red" }}>{passwordError}</div>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/user/reset-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/user/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default Login;
