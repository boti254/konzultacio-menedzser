import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = (email: string, password: string) => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
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
      const loginResponse: { message: string; token: string } =
        await result.json();
      if (result.status == 200) {
        localStorage.setItem("token", loginResponse.token);
        setLoggedIn(true);
        navigate("todo-student");
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
