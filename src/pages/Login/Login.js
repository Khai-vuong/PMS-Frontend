import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Clear any previous errors
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        username,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/projects");
      } else {
        setError("Login failed: No token received.");
      }
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
