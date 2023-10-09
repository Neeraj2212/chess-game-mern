import "./ChessGame.css";
import Chessboard from "@components/Chessboard/Chessboard";
import Turn from "@components/Turn/Turn";
import FallenPiecesRack from "@components/FallenPiecesRack/FallenPiecesRack";

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
