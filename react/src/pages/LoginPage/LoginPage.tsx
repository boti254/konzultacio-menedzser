import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"
//import { useLogin } from "../../hooks/useLogin";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("https://szoftarch.webgravir.hu/api/login", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                },
              body: JSON.stringify({email: email, password: password})
            });
            const result = await response;
            const loginResponse: {message: string, token: string} = await result.json();
            if (result.status == 200) {
                localStorage.setItem('token', loginResponse.token);
                navigate('todo-student');
            }
            else {
                alert(loginResponse.message)
            }
          } catch {
          } finally {
          }
        
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    autoComplete="email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

        <label htmlFor="password" className="login-label">
          Password:
        </label>
        <input
          className="login-input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
