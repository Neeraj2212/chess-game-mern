import "./ChessGame.css";
import Chessboard from "../Chessboard/Chessboard";
import Turn from "../Turn/Turn";
import FallenPiecesRack from "../FallenPiecesRack/FallenPiecesRack";

const ChessGame = () => {
  return (
    <div className="chess-game">
      <Chessboard />
      <Turn />
      <FallenPiecesRack />
    </div>
  );
};

export default ChessGame;
