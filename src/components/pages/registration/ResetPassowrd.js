import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import validator from "validator";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const focusedColor = "black";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
  width: 300,
  bgcolor: "white",
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    borderRadius: "1em 1em 1em 1em",
    padding: "20px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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

function ResetPassowrd() {
  const classes = useStyles();
  const history = useHistory();

  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [buttonMessage, setButtonMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenError = () => {
    setError("Invalid email address!");
    setOpenError(true);
  };

  const handleCloseError = () => {
    setError("");
    setOpenError(false);
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

    if (!validator.isEmail(emailValue.email)) {
      setEmailError("Invalid email address!");
    } else {
      setEmailError("");
      axios
        .post(`http://localhost:8000/api/users/reset-password`, {
          email: emailValue.email,
        })
        .then((response) => {
          setUserId(response.data);
          handleClose();
          setModalMessage(
            "Please access your email and reset your password by validating your account."
          );
          setButtonMessage("Confirm and Login");
          handleOpen();
        })
        .catch((err) => {
          if (err.response.status === 404) {
            handleOpenError();
          }
        });
    }
  };

  return (
    <div className="bg-[#2c90ac] flex h-screen justify-center items-center">
      <Modal
        open={openError}
        onClose={handleCloseError}
        className="flex justify-center items-center"
      >
        <p className="bg-white rounded h-35 w-18 px-5 py-5">{error}</p>
      </Modal>

      <div className="w-full max-w-md flex ">
        <form
          className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${classes.form}`}
          noValidate
        >
          <p>Request Password Reset</p>
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

          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography variant="h6" component="h2">
                Email Request
              </Typography>
              <Typography sx={{ mt: 2 }}>{modalMessage}</Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  history.push({
                    pathname: "/user/changePassword/" + userId,
                  });
                }}
              >
                {buttonMessage}
              </Button>
            </Box>
          </Modal>
        </form>
      </div>
    </div>
  );
}

export default ResetPassowrd;
