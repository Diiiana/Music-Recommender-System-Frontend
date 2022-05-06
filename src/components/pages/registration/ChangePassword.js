import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import { useHistory, useParams } from "react-router-dom";
import { useButtonStyles } from "../../commons/Constants";
import { HOST } from "../../commons/Hosts";

function ChangePassword() {
  const classes = useButtonStyles();
  const history = useHistory();
  const resetData = useParams();
  const [tokenValue, setTokenValue] = useState("");

  const [passwordConfirmError, setPasswordConfError] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const checkTokenValue = (e) => {
    var token = e.target.value;
    setTokenValue({ ...tokenValue, token });
  };

  const [valuesConfirmPassword, setValuesConfirmPassword] = useState({
    confirmPassword: "",
    showConfirmPassword: false,
  });

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
    if (values.password !== valuesConfirmPassword.confirmPassword) {
      setPasswordConfError("Passwords do not match!");
    } else {
      setPasswordConfError("");
      const id = resetData.id;
      axios
        .post(HOST.backend_api + "users/changePassword", {
          userId: id,
          token: tokenValue.token,
          password: values.password,
        })
        .then((response) => {
          history.push({
            pathname: "/user/login",
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <div className="bg-[#2c90ac] flex h-screen justify-center items-center">
      <div className="w-full max-w-md flex ">
        <form
          className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${classes.form}`}
          noValidate
          id="form"
        >
          <p>Change your password</p>
          <div className="mb-4">
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="token"
              type="text"
              label="Verification code"
              name="token"
              autoFocus
              onChange={(e) => checkTokenValue(e)}
              className={classes.root}
            />
          </div>
          <div className="mb-4">
            <TextField
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
            <div style={{ color: "red" }}>{passwordConfirmError}</div>
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              margin="normal"
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
            onClick={(e) => handleSubmit(e)}
          >
            submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
