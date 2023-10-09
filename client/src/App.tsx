import "./App.css";
import ChessGame from "./components/ChessGame/ChessGame";
import { GameProvider } from "./contexts/GameContext";

function App() {
  return (
    <GameProvider>
      <div id="app">
        <ChessGame />
      </div>
    </GameProvider>
  );
}

export default App;
