import "../../../assets/styles/App.css";
import React from "react";
import { useHistory } from "react-router-dom";
// import { useState } from "react";
import welcome from "../../../assets/images/welcome.png";
// import Cubes from "../../commons/Cubes";
// import hp from "../../../assets/images/hp.png";

function App() {
  const history = useHistory();

  const redirect = () => {
    history.push("/user/login");
  };

  const redirectRegister = () => {
    history.push("/user/register");
  };

  const menuToggle = (e) => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("h-32");
  };

  return (
    <div
      className="overflow-y-hidden"
      style={{ minHeight: 700, backgroundColor: "#BE123C" }}
    >
      <nav
        style={{ backgroundColor: "#00788A" }}
        class="bg-white border-gray-200 px-2 sm:px-5 py-3.5 flex fixed w-screen"
      >
        <div class="flex-1 bg-[#00788A] flex justify-center mr-auto">
          <div id="menu" class="bg-[#00788A] ml-auto md:hidden inline-flex items-center">
            <button
              onClick={(e) => menuToggle(e)}
              class="flex items-center px-3 py-2 border rounded"
              type="button"
            >
              <svg
                class="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path
                  fill="currentColor"
                  d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                />
              </svg>
            </button>
          </div>

          <div class="bg-[#00788A] hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a
                  href="#home"
                  class="block py-2 pr-4 pl-3 focus:text-black bg-blue-700 rounded md:bg-transparent md:text-white md:p-0"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  class="block py-2 pr-4 pl-3 focus:text-black text-white hover:bg-black md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  class="block py-2 pr-4 pl-3 focus:text-black text-white hover:bg-black md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  class="block py-2 pr-4 pl-3 focus:text-black text-white hover:bg-black md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section
        id="home"
        style={{ maxHeight: "100vh", minHeight: "100vh" }}
        class="bg-[#00788A] grid grid-cols-2 divide-x py-12 items-center"
      >
        <div class="text-center text-xl flex justify-center items-center text-white">
          <div class="relative z-0">
            <img
              class="object-contain object-center h-48 w-48"
              src={welcome}
              alt=""
            />
            <h1>Welcome to Muse!</h1>
            <button
              onClick={redirect}
              class="bg-gray-200 rounded text-gray-500 hover:bg-gray-500 text-black-700 hover:text-white py-2 px-4 hover:border-transparent"
            >
              SIGN IN
            </button>
            <button
              onClick={redirectRegister}
              class="bg-transparent rounded hover:bg-gray-500 text-black-700 hover:text-white py-2 px-4 hover:border-transparent"
            >
              REGISTER
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 divide-x">
          <div class="h-96 w-96 relative cursor-pointer flex-1 flex justify-center mr-auto">
            <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
            <div class="absolute inset-0 transform  hover:scale-75 transition duration-300">
              <div class="h-full w-full bg-rose-700 rounded-lg shadow-2xl text-center flex justify-center">
                <div
                  style={{
                    padding: "22vh 1vh 0vh 1vh",
                    color: "white",
                  }}
                >
                  <i>
                    Empty your mind, relax your body and deepen your soul into
                    vibrant worlds by listening to your favorite songs.
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="about"
        style={{
          backgroundColor: "#caf0f8",
          minHeight: "100vh",
          maxHeight: "100vh", 
        }}
      >
        <div
        class = "grid grid-cols-2">
          <div
          class="bg-white sm:text-sm sm:ml-10 sm:mt-10 md:text-xl md:w-1/2 leading-8 rounded px-8 py-10 md:mt-24 md:ml-24 text-center"
          >
            <p>Muse is an application that allows you to become absorbed in thought
              by listening to the best songs from 1950 to 2019. Find the music you like 
              and embrace the curiosity to discover new songs and artists.
            </p>

          </div>
        </div>
        <p
        class="text-center align-middle sm:py-32 md:py-8 text-4xl"
        >
          ABOUT US
        </p>
      </section>

      <section
        id="services"
        style={{
          backgroundColor: "#caf0f8",
          minHeight: "80vh",
        }}
      ></section>

      <footer
        id="contact"
        style={{
          backgroundColor: "#BE123C",
          width: "100%",
          height: "30vh",
          position: "relative",
          bottom: "0",
          top: "100%"
        }}
        class="mb-0 bottom-0"
      >
        <div class="grid grid-cols-2">
          <div class="grid grid-cols-2">
            <p
            class="-rotate-90 text-center text-6xl mt-24 text-white italic"
            >MUSE</p>

            <div class="flex justify-center items-center lg:grid-cols-4 md:grid-cols-2">
              <div class="mb-6 mt-1 text-white">
                <h5 class="uppercase font-bold mb-2.5">MUSIC</h5>

                <ul class="list-none mb-0">
                  <li>
                    <a href="https://www.riaa.com/facts/" class="text-white">
                      Facts
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.billboard.com/charts/artist-100/"
                      class="text-white"
                    >
                      Artists
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="">
            <form action="">
              <div class="mr-48 mt-1 grid flex justify-right items-right text-right text-white mt-10">
                <p class="mr-2">
                  <strong>Sign up to receive updates</strong>
                </p>

                <div>
                  <input
                    type="text"
                    class="
                form-control
                block
                w-52
                px-3
                py-1.5
                text-black
                bg-white 
                rounded
                transition
                ease-in-out
                float-right
              "
                    placeholder="Email address"
                  />
                </div>

                <div class="mb-6 mr-11 mt-1">
                  <button
                    type="submit"
                    class="float-right px-6 py-2 border-2 
                    border-white text-white font-medium 
                    text-xs rounded "
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
