import { useContext } from "react";
import { Modal } from "../Modal/Modal";
import { GameContext } from "@src/contexts/GameContext";
import { Color } from "@helpers/Constants";

interface GameOverModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameOverModal = ({ show, setShow }: GameOverModalProps) => {
  const { board, startNewGame } = useContext(GameContext);

  const winner = board.playerTurn === Color.BLACK ? "Black" : "White";
  const winnerKingImage = `assets/images/king_${board.playerTurn}.png`;

  return (
    <Modal show={show} className="game-over-modal">
      <img src={winnerKingImage} alt="King" />
      <h2>{winner} Won</h2>
      <button
        onClick={() => {
          startNewGame();
          setShow(false);
        }}
        className="new-game-button"
      >
        Start New Game
      </button>
    </Modal>
  );
};

export default GameOverModal;
