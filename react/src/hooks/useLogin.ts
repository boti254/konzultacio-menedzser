import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/Interfaces";

export const useLogin = (email: string, password: string) => {
  // const [username, setUsername] = useState('');
  //const [userState, setUser] = useState<User>();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://szoftarch.webgravir.hu/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const result = await response;
      const loginResponse: { message: string; token: string; user: User } =
        await result.json();
      if (result.status == 200) {
        localStorage.setItem("token", loginResponse.token);
        setLoggedIn(true);
        //setUser(user)
        navigate(`/menu/${loginResponse.user.name}`);
      } else {
        alert(loginResponse.message);
      }
    } catch {
      /* empty */
    } finally {
      /* empty */
    }
  };

  const handleLogout = () => {
    // Perform logout logic here
    setLoggedIn(false);
  };

  return {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };
};
