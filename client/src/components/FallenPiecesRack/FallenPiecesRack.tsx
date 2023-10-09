import { useContext } from "react";
import "./FallenPiecesRack.css";
import { GameContext } from "@src/contexts/GameContext";

const FallenPiecesRack = () => {
  const { board } = useContext(GameContext);

  return (
    <div className="fallen-pieces-block">
      <span>Fallen Pieces</span>
      <div className="fallen-pieces-rack">
        {board.fallenPieces.map((piece, index) => {
          return <img key={index} src={piece.image} alt={piece.type} />;
        })}
      </div>
    </div>
  );
};

export default FallenPiecesRack;
