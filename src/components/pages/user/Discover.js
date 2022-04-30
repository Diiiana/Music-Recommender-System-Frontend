import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import UserNavbar from "../../commons/UserNavbar";
import axios from "axios";
import Carousel from "../../commons/Carousel";
import image1 from "../../../assets/images/1.jpg";

function Discover() {
  return (
    <div className="w-full h-screen bg-[#0e7490] overflow-hidden">
        <UserNavbar/>
        <div className="mt-12">
        <Carousel/>
        </div>
    </div>
  );
}

export default Discover;
