import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios
      .post("/api/auth/login", {
        userName,
        password,
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    console.log(response);

    if (response && response.data) {
      toast.success("Logged in successfully!");
      setUserName("");
      setPassword("");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
