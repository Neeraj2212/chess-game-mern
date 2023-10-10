import { GameContext } from "@src/contexts/GameContext";
import "./SavedGames.css";
import { useContext } from "react";

export const SavedGames = () => {
  const { savedGames } = useContext(GameContext);

  return (
    <>
      <span>Resume Saved Games</span>
      <div className="saved-games">
        <div className="saved-games-rack">
          {savedGames.map((savedGame) => {
            return (
              <div className="saved-game">
                <span>{savedGame.gameId}</span>
                <div className="actions">
                  <button
                    onClick={() => {
                      // board.loadGame(savedGame);
                    }}
                    className="resume-btn"
                  >
                    Resume
                  </button>
                  <button
                    onClick={() => {
                      // board.deleteGame(savedGame);
                    }}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
