import { createContext, useState, useEffect } from "react";
import { isLogin } from "../apis/getlogin";
import { getFromLocalStorage } from "../utils/utils";


export const AuthContext = createContext({
  isUserLogin: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = getFromLocalStorage("accessToken");
      if (accessToken) {
        const res = await isLogin(accessToken);
        setIsUserLogin(res === 200);
      } else {
        setIsUserLogin(false);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const accessToken = getFromLocalStorage("accessToken");
      if (!accessToken && isUserLogin) {
        setIsUserLogin(false); 
      }
    };

    const intervalId = setInterval(checkToken, 1000);

    return () => {
      clearInterval(intervalId); 
    };
  }, [isUserLogin]);

  const login = () => {
    setIsUserLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken"); 
    setIsUserLogin(false); 
  };

  return (
    <AuthContext.Provider value={{ isUserLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};