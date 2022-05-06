import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import image1 from "../../assets/images/1.jpg";
import image2 from "../../assets/images/2.jpg";
import image4 from "../../assets/images/4.jpg";

let count = 0;
function Carousel() {
  const [position, setPosition] = useState(0);
  const images = [image1, image2, image4];

  const handleOnNextClick = () => {
    count = (count + 1) % images.length;
    setPosition(count);
  };

  const handleOnPrevClick = () => {
    const len = images.length;
    count = (position + len - 1) % len;
    setPosition(count);
  };

  return (
    <div className="w-full relative select-none">
      <div
        style={{
          background: `url(${images[position]})  no-repeat center center / cover`,
          minHeight: "50vh",
        }}
      />
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
        <IconButton onClick={handleOnPrevClick}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={handleOnNextClick}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Carousel;
