import { UserContext } from "@src/contexts/UserContext";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignUp.css";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle sign up and redirect to game page
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

    if (response && response.data) {
      toast.success("Account created successfully!");
      setUserName("");
      setPassword("");
      updateUser(response.data.data);
      navigate("/game");
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
