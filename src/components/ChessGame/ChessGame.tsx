import "./ChessGame.css";
import Chessboard from "../Chessboard/Chessboard";
import Turn from "../Turn/Turn";

const ChessGame = () => {
  return (
    <div className="chess-game">
      <div></div>
      <Chessboard />
      <Turn />
    </div>
  );
};

export default ChessGame;
