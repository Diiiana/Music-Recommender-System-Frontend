import React, { useEffect, useState } from "react";
import image1 from "../../assets/images/1.jpg";
import image2 from "../../assets/images/2.jpg";
import image3 from "../../assets/images/3.jpg";
import image4 from "../../assets/images/4.jpg";

let count = 0;
const featuredImages = [image1, image2, image4];
function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnNextClick = () => {
    count = (count + 1) % featuredImages.length;
    setCurrentIndex(count);
  };

  const handleOnPrevClick = () => {
    const productsLength = featuredImages.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
  };

  useEffect(() => {
    startSlider();
  }, []);

  const startSlider = () => {
    setInterval(() => {
      handleOnNextClick();
    }, 5000);
  };

  return (
    <div className="w-full relative select-none">
      <div
        style={{
          background: `url(${featuredImages[currentIndex]})  no-repeat center center / cover`,
          minHeight: "50vh"
        }}
      >
      </div>
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
        <button onClick={handleOnPrevClick}>aafawref</button>
        <button onClick={handleOnNextClick}>awfawrfa</button>
      </div>
    </div>
  );
}

export default Carousel;
