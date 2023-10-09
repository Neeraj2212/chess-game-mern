import { useContext } from "react";
import "./Turn.css";
import { GameContext } from "@src/contexts/GameContext";

const Turn = () => {
  const { board } = useContext(GameContext);

  const image = `assets/images/pawn_${board.playerTurn}.png`;
  const tileClass = `turn-tile ${
    board.playerTurn === "w" ? "white-tile" : "black-tile"
  }`;

  return (
    <div className="show-turn">
      <div className="wrapper">
        <span>Active Player</span>
        <div className={`turn-tile ${tileClass}`}>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="chess-piece"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Turn;
