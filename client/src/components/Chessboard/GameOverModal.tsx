import { useContext } from "react";
import { Modal } from "../Modal/Modal";
import { GameContext } from "@src/contexts/GameContext";
import { Color } from "@helpers/Constants";

interface GameOverModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onNewGame: () => void;
}

const GameOverModal = ({ show, setShow, onNewGame }: GameOverModalProps) => {
  const { board } = useContext(GameContext);

  const winner = board.playerTurn === Color.BLACK ? "Black" : "White";
  const winnerKingImage = `assets/images/king_${board.playerTurn}.png`;

  return (
    <Modal show={show} className="game-over-modal">
      <img src={winnerKingImage} alt="King" />
      <h2>{winner} Won</h2>
      <button
        onClick={() => {
          onNewGame();
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
