import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios
      .post("/api/auth/signup", {
        userName,
        password,
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    console.log(response);

    if (response && response.data) {
      toast.success("Account created successfully!");
      setUserName("");
      setPassword("");
    }
  };
  return (
    <div className="sign-up-page">
      <form onSubmit={(e) => handleSignUp(e)} className="sign-up-form">
        <h1>Sign Up</h1>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={userName}
            required
            id="username"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
