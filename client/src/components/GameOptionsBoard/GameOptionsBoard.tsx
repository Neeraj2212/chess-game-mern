import { useContext, useState } from "react";
import FallenPiecesRack from "../FallenPiecesRack/FallenPiecesRack";
import Turn from "../Turn/Turn";
import "./GameOptionsBoard.css";
import { GameContext } from "@src/contexts/GameContext";

enum VIEWS {
  GAME_STATS = "game-stats",
  NEW_GAME = "new-game",
}

const GameOptionsBoard = () => {
  const [selectedView, setSelectedView] = useState(VIEWS.GAME_STATS);

  const { board, startNewGame } = useContext(GameContext);

  return (
    <div className="game-options-board">
      <div className="game-options">
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
        <div className="new-game">
          <button
            onClick={() => {
              startNewGame();
            }}
            className="btn"
          >
            Start New Game
          </button>
          <button onClick={() => {}} className="btn">
            Save Game
          </button>

          <div className="saved-games">
            <span>Resume Saved Games</span>
            {/* <div>
            TODO: List of saved games and options to load them
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameOptionsBoard;
