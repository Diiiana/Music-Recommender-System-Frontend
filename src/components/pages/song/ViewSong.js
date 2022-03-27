import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

function ViewSong(props) {
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.id);
  })

  return (
    <div>

    </div>
  );
};

export default ViewSong;
