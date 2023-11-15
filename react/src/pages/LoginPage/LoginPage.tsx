import { useState } from "react";
import "./LoginPage.css"

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Add your logic for handling the form submission (e.g., sending data to a server)
      console.log('Email:', email);
      console.log('Password:', password);
  };

  return (
      <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />

              <label htmlFor="password">Password:</label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />

              <button type="submit">Login</button>
          </form>
      </div>
  );
}

export default LoginPage;
