import Chessboard from "@components/Chessboard/Chessboard";
import GameOptionsBoard from "@src/components/GameOptionsBoard/GameOptionsBoard";
import Header from "@src/components/Header/Header";
import "./ChessGame.css";

const ChessGame = () => {
  return (
    <div className="chess-game-page">
      <Header />
      <div className="chess-game">
        <Chessboard />
        <GameOptionsBoard />
      </div>
    </div>
  );
};

export default ChessGame;
