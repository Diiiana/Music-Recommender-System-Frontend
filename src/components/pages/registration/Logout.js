import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { HOST } from "../../commons/Hosts";

function Logout() {
  const history = useHistory();

  useEffect(() => {
    axios
      .post(HOST.backend_api + "users/logout/blacklist", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then((response) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        history.push("/user/login");
      });
  });
  return <div className="bg-[#2c90ac] "></div>;
}

export default Logout;
