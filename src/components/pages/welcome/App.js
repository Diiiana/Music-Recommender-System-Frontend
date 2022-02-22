import "../../../assets/styles/App.css";
import React from "react";
import { useHistory } from "react-router-dom";
// import { useState } from "react";
import welcome from "../../../assets/images/welcome.png";

function App() {
  const history = useHistory();

  const redirect = () => {
    history.push("/user/login");
  };

  const redirectRegister = () => {
    history.push("/user/register");
  };

  // const [show, setShow] = useState(false);
  return (
    <div
      className="overflow-y-hidden"
      style={{ minHeight: 700, backgroundColor: "#00788A" }}
    >
      <nav 
      style={{ backgroundColor: "#00788A" }}
      class="bg-white border-gray-200 px-2 sm:px-5 py-3.5 flex fixed w-screen">
        <div class="flex-1 flex justify-center mr-auto">
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-white-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white-200"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a
                  href="#home"
                  class="block py-2 pr-4 pl-3 text-black bg-blue-700 rounded md:bg-transparent md:text-grey-700 md:p-0 dark:text-black"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-gray-400 md:dark:hover:text-black dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-gray-400 md:dark:hover:text-black dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-black dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
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
        class="grid grid-cols-2 divide-x py-12 items-center"
      >
        <div class="text-center text-xl flex justify-center items-center">
          <div class="relative z-0">
            <img
              class="object-contain object-center h-48 w-48"
              src={welcome}
              alt=""
            />
            <h1>Welcome to Muse!</h1>
            <button 
            onClick={redirect}
            class="bg-gray-200 rounded hover:bg-gray-500 text-black-700 hover:text-white py-2 px-4 hover:border-transparent">
              SIGN IN
            </button>
            <button 
            onClick={redirectRegister}
            class="bg-transparent rounded hover:bg-gray-500 text-black-700 hover:text-white py-2 px-4 hover:border-transparent">
              REGISTER
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 divide-x">
          <div class="h-96 w-96 relative cursor-pointer flex-1 flex justify-center mr-auto">
            <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
            <div class="absolute inset-0 transform  hover:scale-75 transition duration-300">
              <div class="h-full w-full bg-rose-700 rounded-lg shadow-2xl"></div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="about"
        style={{
          backgroundColor: "#caf0f8",
          marginTop: "100vh",
          minHeight: "80vh",
        }}
      >
        {/* <Cubes></Cubes> */}
      </section>
      {/* Code block ends */}

      <section
        id="services"
        style={{
          backgroundColor: "#caf0f8",
          marginTop: "100vh",
          minHeight: "80vh",
        }}
      >
      </section>

      <section
        id="contact"
        style={{
          backgroundColor: "#BE123C",
          minHeight: "30vh",
          maxHeight: "40vh",
          marginBottom: "0",
        }}
      >
      </section>
    </div>
  );
}

export default App;
