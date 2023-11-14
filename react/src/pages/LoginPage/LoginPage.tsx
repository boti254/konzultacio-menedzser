function LoginPage() {
  return (
    <div>
      <h2>Login</h2>
      <label>Email:</label>
      <input
        type="email"
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default LoginPage;
