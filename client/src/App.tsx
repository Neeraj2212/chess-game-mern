import Login from "@pages/Login/Login";
import SignUp from "@pages/SignUp/SignUp";
import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { GameProvider } from "./contexts/GameContext";
import { UserContext } from "./contexts/UserContext";
import ChessGame from "./pages/ChessGame/ChessGame";
import axios from "axios";

function App() {
  const { user } = useContext(UserContext);

  // Axios config to send cookies with every request
  axios.defaults.withCredentials = true;

  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes only avaiable after login */}
          {user && (
            <Route
              path="/game"
              element={
                <GameProvider>
                  <ChessGame />
                </GameProvider>
              }
            />
          )}

          {/* Default fallback to login page */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
