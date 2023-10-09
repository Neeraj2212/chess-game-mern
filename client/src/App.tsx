import Login from "@pages/Login/Login";
import SignUp from "@pages/SignUp/SignUp";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { GameProvider } from "./contexts/GameContext";
import ChessGame from "./pages/ChessGame/ChessGame";

function App() {
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/game"
            element={
              <GameProvider>
                <ChessGame />
              </GameProvider>
            }
          />
          <Route path="*" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
