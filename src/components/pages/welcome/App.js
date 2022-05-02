import React from "react";
import Navbar from "../../commons/Navbar";
import Hero from "../../pages/welcome/Hero";
import About from "../../pages/welcome/About";
import Services from "../../pages/welcome/Services";
import Footer from "../../pages/welcome/Footer";

function App() {
  return (
    <div className="h-screen bg-[#2c90ac] w-full">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Footer />
    </div>
  );
}

export default App;
