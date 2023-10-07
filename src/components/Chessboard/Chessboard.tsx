import Tile from "../Tile/Tile";
import "./Chessboard.css";

interface Piece {
  image: string;
  positionX: number;
  positionY: number;
  type: PieceType;
}

enum PieceType {
  BISHOP,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
}

const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;

  pieces.push({
    image: `assets/images/rook_${type}.png`,
    positionX: 0,
    positionY: y,
    type: PieceType.ROOK,
  });
  pieces.push({
    image: `assets/images/rook_${type}.png`,
    positionX: 7,
    positionY: y,
    type: PieceType.ROOK,
  });
  pieces.push({
    image: `assets/images/knight_${type}.png`,
    positionX: 1,
    positionY: y,
    type: PieceType.KNIGHT,
  });
  pieces.push({
    image: `assets/images/knight_${type}.png`,
    positionX: 6,
    positionY: y,
    type: PieceType.KNIGHT,
  });
  pieces.push({
    image: `assets/images/bishop_${type}.png`,
    positionX: 2,
    positionY: y,
    type: PieceType.BISHOP,
  });
  pieces.push({
    image: `assets/images/bishop_${type}.png`,
    positionX: 5,
    positionY: y,
    type: PieceType.BISHOP,
  });
  pieces.push({
    image: `assets/images/queen_${type}.png`,
    positionX: 3,
    positionY: y,
    type: PieceType.QUEEN,
  });
  pieces.push({
    image: `assets/images/king_${type}.png`,
    positionX: 4,
    positionY: y,
    type: PieceType.KING,
  });
}

for (let i = 0; i < 8; i++) {
  pieces.push({
    image: "assets/images/pawn_b.png",
    positionX: i,
    positionY: 6,
    type: PieceType.PAWN,
  });
}

for (let i = 0; i < 8; i++) {
  pieces.push({
    image: "assets/images/pawn_w.png",
    positionX: i,
    positionY: 1,
    type: PieceType.PAWN,
  });
}

const Chessboard = () => {
  const board = [];

  for (let j = 7; j >= 0; j--)
    for (let i = 0; i <= 7; i++) {
      let image = undefined;

      pieces.forEach((piece) => {
        if (piece.positionX === i && piece.positionY === j) {
          image = piece.image;
        }
      });

      board.push(<Tile key={`${i}-${j}`} number={i + j} image={image} />);
    }

  return <div id="chessboard">{board}</div>;
};

export default Chessboard;
