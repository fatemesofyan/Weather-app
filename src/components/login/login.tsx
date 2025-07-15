// src/pages/login/loginPage.tsx
import { setInLocalStorage } from "../../utils/utils";
import { loginUser } from "../../apis/getlogin";
import { ROUTES } from "../../router/routes";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  const loginHandler = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    loginUser({ email: username.value, password: password.value })
      .then((res) => {
        setInLocalStorage("accessToken", res.accessToken);
        login(); 
        navigate(ROUTES.home);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={loginHandler}
        className="flex flex-col justify-around gap-2 bg-white w-[480px] p-4 h-64 rounded-xl shadow-xl"
      >
        <div className="flex flex-col gap-2 ">
          <h1 className="text-center font-bold text-2xl">Login In</h1>
          <input
            className="border-gray-400 border-1 p-2 rounded-md"
            placeholder="username"
            type="text"
            name="username"
          />
          <div className="flex justify-between items-center border-gray-400 border-1 rounded-md">
            <input
              className="w-full p-2 outline-none"
              placeholder="password"
              type="password"
              name="password"
            />
            <img
              className="h-4 mr-2 hover:cursor-pointer"
              src="https://www.svgrepo.com/show/511132/show.svg"
              alt=""
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="p-2 rounded-2xl border-black border-1 w-full bg-blue-500 text-white hover:cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}