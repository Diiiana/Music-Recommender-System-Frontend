import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useButtonStyles } from "./Constants";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
  width: "45vh",
  bgcolor: "white",
};

function ErrorMessage(props) {
  const history = useHistory();
  const classes = useButtonStyles();

  return (
    <div>
      <Modal open={props.isOpen}>
        <Box sx={style}>
          <Typography>{props.message}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              history.push({
                pathname: "/user/login/",
              });
            }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ErrorMessage;
