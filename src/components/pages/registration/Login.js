import avatar from "../../../assets/images/avatar.png";

function Login() {
  return (
    <div
      style={{ backgroundColor: "#00788A" }}
      className="flex h-screen justify-center items-center"
    >
      <div class="w-full max-w-md flex ">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <img src={avatar} alt="" />
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
          <div class="flex items-center justify-between">
            <button
              class="hover:bg-[#BE123C] hover:text-white text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <a
              class="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
