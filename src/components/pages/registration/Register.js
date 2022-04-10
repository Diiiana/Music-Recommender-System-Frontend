import { React, useState } from "react";
import avatar from "../../../assets/images/avatar_register.png";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import validator from "validator";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

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
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
}));

function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [passwordConfirmError, setPasswordConfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [valuesConfirmPassword, setValuesConfirmPassword] = useState({
    confirmPassword: "",
    showConfirmPassword: false,
  });

  const checkUsername = (e) => {
    var username = e.target.value;
    setUsernameValue({ ...usernameValue, username });
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

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePasswordChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPasswordConfirm = () => {
    setValuesConfirmPassword({
      ...valuesConfirmPassword,
      showConfirmPassword: !valuesConfirmPassword.showConfirmPassword,
    });
  };

  const handlePasswordConfirmChange = (prop) => (event) => {
    setValuesConfirmPassword({
      ...valuesConfirmPassword,
      [prop]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usernameValue.username === undefined || usernameValue.username.length < 2) {
      setUsernameError("Username too short!");
    } else {
      setUsernameError("");
      if (values.password === undefined || values.password.length < 5) {
        setPasswordConfError("Password too short!");
      } else {
        if (values.password !== valuesConfirmPassword.confirmPassword) {
          setPasswordConfError("Passwords do not match!");
        } else {
          setPasswordConfError("");
          if (emailValue.email === undefined || !validator.isEmail(emailValue.email)) {
            setEmailError("Invalid email address!");
          } else {
            setEmailError("");
            axios
              .post(`http://localhost:8000/api/users/register/`, {
                email: emailValue.email,
                user_name: usernameValue.username,
                password: values.password,
              })
              .then((res) => {
                console.log(res.data);
                history.push({
                  pathname: "/register/genres",
                  state: { 
                    user: emailValue.email
                  },
                });
              });
          }
        }
      }
    }
  };

  return (
    <div className="bg-[#0e7490] flex h-screen justify-center items-center">
      <div className="w-full max-w-md xs:mx-4">
        <form
          className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${classes.form}`}
          noValidate
        >
          <img
            style={{ display: "inline-block" }}
            className="h-20 w-20 object-center"
            src={avatar}
            alt=""
          />
          <h1
            className="text-lg"
            style={{ display: "inline-block", marginLeft: "3vh" }}
          >
            Create Account
          </h1>
          <div className="mb-4">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={(e) => checkUsername(e)}
              className={classes.root}
            />
            <div style={{ color: "red" }}>{usernameError}</div>
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
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
            <div style={{ color: "red" }}>{passwordConfirmError}</div>
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpassword"
              label="Confirm Password"
              name="password"
              className={classes.root}
              type={
                valuesConfirmPassword.showConfirmPassword ? "text" : "password"
              }
              onChange={handlePasswordConfirmChange("confirmPassword")}
              value={valuesConfirmPassword.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={(e) => e.preventDefault()}
                      className="hover:text-black"
                    >
                      {valuesConfirmPassword.showConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ color: "red" }}>{passwordConfirmError}</div>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
