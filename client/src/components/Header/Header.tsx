import { useContext } from "react";
import "./Header.css";
import { UserContext } from "@src/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="header">
      <div>
        <p>Hello! {user?.userName}</p>
      </div>
      <div className="logout-btn-wrapper">
        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
