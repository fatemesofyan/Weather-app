// src/components/LogoutButton.tsx

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    logout();
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;