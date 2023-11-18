import { useState } from "react";
import "./LoginPage.css";
import { useLogin } from "../../hooks/useLogin";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useLogin(email, password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="km-label login-element-margin">
          Email:
        </label>
        <input
          autoComplete="email"
          className="km-input login-element-margin"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="km-label login-element-margin">
          Jelszó:
        </label>
        <input
          className="km-input login-element-margin"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="km-button login-element-margin" type="submit">
          Bejelentkezés
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
