import React from "react";
import UserNavbar from "../../commons/UserNavbar";
import Carousel from "../../commons/Carousel";
import DiscoverableSongs from "../song/DiscoverableSongs";

function Discover() {
  return (
    <div className="w-full h-screen bg-[#0e7490] overflow-hidden">
      <UserNavbar title="Discover" />
      <div className="mt-12">
        <Carousel />
      </div>
      <div className="h-1/3 mt-4 mx-4 rounded bg-white">
        <DiscoverableSongs/>
      </div>
    </div>
  );
}

export default Discover;
