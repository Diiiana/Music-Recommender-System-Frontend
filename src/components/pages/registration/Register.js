import { React, useState } from "react";
import avatar from "../../../assets/images/avatar_register.png";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import validator from "validator";
// import GoogleLogin from "react-google-login";
import axios from "axios";
import mySvg from '../../../assets/images/waves.svg';

const baseURL = 'http://127.0.0.1:8000/';

function Register() {
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

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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

  const checkUsername= (e) => {
    var username = e.target.value;
    setUsernameValue({ ...usernameValue, username });
  };

  const responseGoogle = (googleData) => {
    console.log(googleData);
    console.log(googleData.profileObj.email)
    console.log(googleData.profileObj.familyName)
    console.log(googleData.profileObj.givenName)
    var email = googleData.profileObj.email;
    setEmailValue({ ...emailValue, email });
    history.push("/register/genres");
  };

  const responseGoogleFail = async (googleData) => {
    alert("nok");
  };

  const redirect = (e) => {
    e.preventDefault();

		axios.post(baseURL + `api/users/register/`, {
				email: emailValue.email,
				user_name: usernameValue.username,
				password: values.password,
			})
			.then((res) => {
				history.push('/register/genres');
				console.log(res);
				console.log(res.data);
			});
    // if (values.password !== valuesConfirmPassword.confirmPassword) {
    //   setPasswordConfError("Passwords do not match!");
    // } else {
    //   setPasswordConfError("");
    // }

    // if (emailValue.email == undefined || !validator.isEmail(emailValue.email)) {
    //   setEmailError("Invalid email address!");
    // } else {
    //   setEmailError("");
    // }

    // history.push("/register/genres");
  };

  return (
    <div className="bg-[#00788A] flex h-screen justify-center items-center">
      <div class="w-full max-w-md">
        <form 
        class="shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ backgroundImage: `url(${mySvg})` }}>
          <div style={{ marginBottom: "1vh" }}>
            <img
              style={{ display: "inline-block" }}
              class="h-20 w-20 object-center"
              src={avatar}
              alt=""
            />
            <h1
              class="text-lg"
              style={{ display: "inline-block", marginLeft: "3vh" }}
            >
              Create an account
            </h1>
          </div>
          <div class="mb-4">
            <InputLabel
              htmlFor="standard-adornment-password"
              style={{
                width: "100%",
              }}
            >
              Username
            </InputLabel>
            <Input
              style={{
                width: "95%",
                margin: "1.5vh 2.5vh 1.5vh 0.5vh",
              }}
              id="username"
              type="text"
              placeholder="username"
              required
              onChange={(e) => checkUsername(e)}
            />
            <div style={{ color: "red" }}>{usernameError}</div>
            </div>
          <div class="mb-4">
            <InputLabel
              htmlFor="standard-adornment-password"
              style={{
                width: "100%",
              }}
            >
              Email
            </InputLabel>
            <Input
              style={{
                width: "95%",
                margin: "1.5vh 2.5vh 1.5vh 0.5vh",
              }}
              id="email"
              type="text"
              value={emailValue.email}
              placeholder="example@email.com"
              required
              onChange={(e) => checkEmailAddress(e)}
            />
            <div style={{ color: "red" }}>{emailError}</div>
          </div>
          <div class="mb-6">
            <InputLabel
              htmlFor="standard-adornment-password"
              style={{
                width: "100%",
              }}
            >
              Password
            </InputLabel>
            <Input
              style={{
                width: "95%",
                margin: "1.5vh 2.5vh 1.5vh 0.5vh",
              }}
              type={values.showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              value={values.password}
              placeholder="Password *"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <div style={{ color: "red" }}>{passwordConfirmError}</div>
          </div>
          <div class="mb-6">
            <InputLabel
              htmlFor="standard-adornment-password"
              style={{
                width: "100%",
              }}
            >
              Confirm Password
            </InputLabel>
            <Input
              style={{
                width: "95%",
                margin: "1.5vh 2.5vh 1.5vh 0.5vh",
              }}
              type={
                valuesConfirmPassword.showConfirmPassword ? "text" : "password"
              }
              onChange={handlePasswordConfirmChange("confirmPassword")}
              value={valuesConfirmPassword.confirmPassword}
              placeholder="Password *"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPasswordConfirm}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {valuesConfirmPassword.showConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <div style={{ color: "red" }}>{passwordConfirmError}</div>
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-rose-700 hover:bg-[#BE123C] hover:text-black ho text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={redirect}
            >
              REGISTER
            </button>
            {/* <GoogleLogin
              class="py-2 px-4"
              clientId="145875622009-m34dr6u2bkvlsdhg272mvkms83jha0vg.apps.googleusercontent.com"
              buttonText="Register with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
              cookiePolicy={"single_host_origin"}
            /> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
