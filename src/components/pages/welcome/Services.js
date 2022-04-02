import React from "react";

function Services() {
  return (
    <div
      name="services_page"
      className="h-80 w-full bg-[#b1b2c5] flex justify-center items-center"
    >
      <div className="grid grid-cols-3">
        <div
          className="sm:w-32 sm:h-32 md:w-52 md:h-48 xs:w-24 xs:h-24 bg-white 
          xs:mx-2 sm:mx-8 lg:mx-8 
          rounded-lg shadow-2xl text-center flex justify-center items-center 
        text-black xs:text-xs sm:text-md md:text-xl
        transform hover:scale-75 transition duration-300"
        >
          <p className="mx-2">Listen to more than 11.000 artists!</p>
        </div>

        <div
          className="sm:w-32 sm:h-32 md:w-52 md:h-48 xs:w-24 xs:h-24 bg-white
          xs:mx-2 sm:mx-8 lg:mx-8 
          rounded-lg shadow-2xl text-center flex justify-center items-center 
        text-black xs:text-xs sm:text-md md:text-xl
        transform hover:scale-75 transition duration-300"
        >
          <p className="mx-2">Discover more through our recommendations</p>
        </div>

        <div
          className="sm:w-32 sm:h-32 md:w-52 md:h-48 xs:w-24 xs:h-24 bg-white 
          xs:mx-2 sm:mx-8 lg:mx-8   rounded-lg shadow-2xl text-center flex justify-center items-center 
        text-black xs:text-xs sm:text-md md:text-xl
        transform hover:scale-75 transition duration-300"
        >
          <p className="mx-2">
            By listening more, you improve your experience!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
