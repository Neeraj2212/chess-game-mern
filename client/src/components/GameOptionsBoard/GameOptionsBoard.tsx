import { useContext, useState } from "react";
import FallenPiecesRack from "../FallenPiecesRack/FallenPiecesRack";
import Turn from "../Turn/Turn";
import "./GameOptionsBoard.css";
import { GameContext } from "@src/contexts/GameContext";
import { SavedGames } from "../SavedGames/SavedGames";

enum VIEWS {
  GAME_STATS = "game-stats",
  NEW_GAME = "new-game-options",
}

const GameOptionsBoard = () => {
  const [selectedView, setSelectedView] = useState(VIEWS.NEW_GAME);
  const { board, startNewGame, saveCurrentGame } = useContext(GameContext);

  return (
    <div className="game-options-board">
      <div className="game-options-tabs">
        <button
          className={`btn ${selectedView === VIEWS.GAME_STATS ? "active" : ""}`}
          onClick={() => setSelectedView(VIEWS.GAME_STATS)}
        >
          Game Stats
        </button>
        <button
          className={`btn ${selectedView === VIEWS.NEW_GAME ? "active" : ""}`}
          onClick={() => setSelectedView(VIEWS.NEW_GAME)}
        >
          New / Save Game
        </button>
      </div>
      {selectedView === VIEWS.GAME_STATS && (
        <div className="stats">
          <div className="game-id">
            <span>Game ID:</span>
            <span>{board.gameId}</span>
          </div>
          <Turn />
          <FallenPiecesRack />
        </div>
      )}
      {selectedView === VIEWS.NEW_GAME && (
        <div className="new-game-options">
          <button
            onClick={() => {
              startNewGame();
            }}
            className="btn"
          >
            Start New Game
          </button>
          <button
            onClick={() => {
              saveCurrentGame();
            }}
            className="btn"
          >
            Save Game
          </button>

          <SavedGames />
        </div>
      )}
    </div>
  );
};

export default GameOptionsBoard;
