import { useRef, useState } from "react";
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

function intialChessPieces() {
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

  return pieces;
}

const Chessboard = () => {
  const chessboardRef = useRef<HTMLDivElement>(null);

  // Active chess piece info
  const [activeChessPiece, setActiveChessPiece] = useState<HTMLElement | null>(null);
  const [activePieceX, setActivePieceX] = useState(0)
  const [activePieceY, setActivePieceY] = useState(0)

  // Array of pieces on the board
  const [pieces, setPieces] = useState(intialChessPieces());

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

  const updateChessPieceLocation = (
    element: HTMLElement,
    posX: number,
    posY: number
  ) => {
    const chessboard = chessboardRef.current;

    if (chessboard && element && element.classList.contains("chess-piece")) {
      const minX = chessboard.offsetLeft - 25; // To Handle piece around edges
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 80;

      const mousePositionX = posX - 50; // To make it relative to center
      const mousePostionY = posY - 50; // To make it relative to center

      element.style.position = "absolute";

      // Check for the position to remain withing the chessboard
      element.style.left =
        mousePositionX < minX
          ? `${minX}px`
          : mousePositionX > maxX
            ? `${maxX}px`
            : `${mousePositionX}px`;

      element.style.top =
        mousePostionY < minY
          ? `${minY}px`
          : mousePostionY > maxY
            ? `${maxY}px`
            : `${mousePostionY}px`;
    }
  };

  const calculateCurrentPos = (mouseX: number, mouseY: number): { x: number, y: number } => {
    const chessboard = chessboardRef.current;

    if (chessboard) {
      const x = Math.floor((mouseX - chessboard?.offsetLeft) / 100);
      const y = Math.abs(Math.ceil((mouseY - chessboard.offsetTop - 800) / 100));
      return { x, y }
    }
    return { x: 0, y: 0 };

  }

  const grabPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const grabbedElement = e.target as HTMLDivElement;
    const { x, y } = calculateCurrentPos(e.clientX, e.clientY);
    setActiveChessPiece(grabbedElement);
    setActivePieceX(x);
    setActivePieceY(y);
    updateChessPieceLocation(grabbedElement, e.clientX, e.clientY);
  };

  const movePiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (activeChessPiece)
      updateChessPieceLocation(activeChessPiece, e.clientX, e.clientY);
  };

  const dropPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setActiveChessPiece(null);
    const { x, y } = calculateCurrentPos(e.clientX, e.clientY)
    // Update Piece location to the new tile
    setPieces(prevState => prevState.map((piece) => {
      if (piece.positionX === activePieceX && piece.positionY === activePieceY) {
        piece.positionX = x;
        piece.positionY = y;
      }
      return piece
    }))
  };

  return (
    <div
      onMouseUp={(e) => dropPiece(e)}
      onMouseMove={(e) => {
        movePiece(e);
      }}
      onMouseDown={(e) => grabPiece(e)}
      ref={chessboardRef}
      id="chessboard"
    >
      {board}
    </div>
  );
};

export default Chessboard;
