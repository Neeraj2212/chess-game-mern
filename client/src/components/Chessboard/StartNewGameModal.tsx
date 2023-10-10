import { useContext, useState } from "react";
import { Modal } from "../Modal/Modal";
import { GameContext } from "@src/contexts/GameContext";

const StartNewGameModal = () => {
  const { openStartGameModal, updateGameId } = useContext(GameContext);

  const [gameId, setGameId] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateGameId(gameId, () => setGameId(""));
  };

  return (
    <Modal className="start-new-game-modal" show={openStartGameModal}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Enter Game ID to start a new game</h2>
        <div className="game-id-form">
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
          <button type="submit" className="btn">
            Start
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StartNewGameModal;
