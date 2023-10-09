import Login from "@pages/Login/Login";
import SignUp from "@pages/SignUp/SignUp";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { GameProvider } from "./contexts/GameContext";
import ChessGame from "./pages/ChessGame/ChessGame";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);

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
