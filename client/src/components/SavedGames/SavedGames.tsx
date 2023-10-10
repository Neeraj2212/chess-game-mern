import { GameContext } from "@src/contexts/GameContext";
import "./SavedGames.css";
import { useContext } from "react";

export const SavedGames = () => {
  const { savedGames, deleteSavedGame, loadGame } = useContext(GameContext);

  return (
    <>
      <span>Resume Saved Games</span>
      <div className="saved-games">
        <div className="saved-games-rack">
          {savedGames.map((savedGame) => {
            return (
              <div key={savedGame._id} className="saved-game">
                <span>{savedGame.gameId}</span>
                <div className="actions">
                  <button
                    onClick={() => {
                      loadGame(savedGame);
                    }}
                    className="resume-btn"
                  >
                    Resume
                  </button>
                  <button
                    onClick={() => {
                      deleteSavedGame(savedGame);
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
