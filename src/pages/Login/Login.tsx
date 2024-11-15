import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const gotoProjectList = () => {
    navigate("/projects/list");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        username: username,
        password: password,
      });

      console.log("Login successful:", response.data);

      const hasToken = localStorage.getItem("token");
      if (hasToken) {
        localStorage.removeItem("token");
      }

      localStorage.setItem("token", response.data.token);
      gotoProjectList();

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "Đăng nhập thất bại");
        console.log(username, password);
      } else {
        setError("Đã có lỗi xảy ra");
      }
      console.error("Error:", err);
    }

  }
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Hiển thị lỗi nếu có */}
      <div className="links">
        <a href="#">
          <u>Forgot password?</u>
        </a>
        <a href="#">
          <u>Do not have an account? Sign up</u>
        </a>
      </div>
    </div>
  );
};
export default Login;
