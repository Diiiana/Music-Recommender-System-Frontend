import React from "react";
import { useHistory } from "react-router-dom";
import Welcome from "../../../assets/images/welcome.png";

function Hero() {
  const history = useHistory();
  
  const redirect = () => {
    history.push("/user/login");
  };

  const redirectRegister = () => {
    history.push("/user/register");
  };

  return (
    <div name="home_page" className="h-screen bg-[#2c90ac] grid grid-cols-2 divide-x py-44 items-center">
      <div className="text-center text-xl flex justify-center items-center text-white">
        <div>
          <img
            className="object-contain object-center h-48 w-48"
            src={Welcome}
            alt=""
          />
          <h1>Welcome to Muse!</h1>
          <button
            onClick={redirect}
            className="bg-gray-200 rounded text-black hover:bg-gray-500 text-black-700 hover:text-white py-2 px-4 hover:border-transparent"
          >
            SIGN IN
          </button>
          <button
            onClick={redirectRegister}
            className="bg-transparent rounded hover:bg-gray-500 text-gray-300 hover:text-white py-2 px-4 hover:border-transparent"
          >
            REGISTER
          </button>
        </div>
      </div>

      <div className="xs:h-36 xs:w-36 sm:h-56 sm:w-72 md:h-88 md:w-88 relative flex justify-center mr-auto">
        <div className="bg-white opacity-25 rounded-lg shadow-2xl" />
        <div className="transform hover:scale-75 transition duration-300">
          <div className="h-full w-full bg-rose-700 rounded-lg shadow-2xl text-center flex justify-center items-center text-white xs:text-xs sm:text-md md:text-xl">
            <i className="mx-2">
              Empty your mind, relax your body and deepen your soul into vibrant
              worlds by listening to your favorite songs.
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
