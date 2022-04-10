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
import { makeStyles } from "@material-ui/core/styles";
import AxiosApi from "../../../services/AxiosApi";
import validator from "validator";
import axios from "axios";

const focusedColor = "black";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    backgroundColor: "white",
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
    "& .MuiInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: focusedColor,
      },
    },
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [emailError, setEmailError] = useState("");
  const [emailValue, setEmailValue] = useState("");
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

    if (!validator.isEmail(email)) {
      setEmailError("Invalid email address!");
    } else {
      setEmailError("");
    }
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
        AxiosApi.post(`users/login/`, {
          email: emailValue.email,
          password: values.password,
        }).then((res) => {
          console.log(res);
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          AxiosApi.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("access_token");
          axios
            .get(`http://localhost:8000/api/songs/user/` + res.data.id)
            .then((r) => {
              console.log(r.data);
              history.push({
                pathname: "/dashboard",
                state: {
                  user: res.data.id,
                  songs: r.data,
                },
              });
            });
        });
      }
    }
  };

  return (
    <div className="bg-[#0e7490] flex h-screen justify-center items-center">
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
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={(e) => checkEmailAddress(e)}
              className={classes.root}
            />
            <div style={{ color: "red" }}>{emailError}</div>
          </div>

          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
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
