import avatar from "../../../assets/images/avatar_register.png";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();

  const redirect = () => {
    history.push("/register/genres");
  };
  return (
    <div
      style={{ backgroundColor: "#00788A" }}
      className="flex h-screen justify-center items-center"
    >
      <div class="w-full max-w-md">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div style={{ marginBottom: "1vh"}}>
            <img 
            style={{ display: 'inline-block' }}
            class="h-20 w-20 object-center" 
            src={avatar} 
            alt="" />
            <h1
            class="text-lg"
            style={{ display: 'inline-block', marginLeft: "3vh" }}
            >Create an account</h1>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm mb-2" for="username">
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm mb-2" for="username">
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="example@email.com"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm mb-2" for="username">
              Birthdate
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthdate"
              type="date"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm mb-2" for="password">
              Password
            </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm mb-2" for="password">
              Confirm Password
            </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="conf-password"
              type="conf-password"
              placeholder="******************"
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="hover:bg-[#BE123C] hover:text-white text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={redirect}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
