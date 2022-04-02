import React from "react";
import WelcomeAbout from "../../../assets/images/wo2.png";

function About() {
  return (
    <div name="about_page" className="w-full h-screen bg-[#E8E9F3]">
      <div className="grid grid-cols-2 divide-x py-44 items-center">
        <p className="text-center mx-2 xs:text-md md:text-xl">
          <b>About Muse</b>
          <br />
          Muse is an application that allows you to become absorbed in thought
          by listening to the best songs. Find the music you like and embrace
          the curiosity to discover new songs and artists.
        </p>
        <div className="flex justify-center items-center">
        <img
          className="object-contain object-right h-96 w-96"
          src={WelcomeAbout}
          alt=""
        />
        </div>
      </div>
    </div>
  );
}

export default About;
