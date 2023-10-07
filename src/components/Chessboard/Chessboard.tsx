import { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";
import Arbiter from "../../arbiter/Arbiter";

export interface Piece {
  image: string;
  positionX: number;
  positionY: number;
  type: PieceType;
  color: Color;
}

export enum PieceType {
  BISHOP,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
}

export enum Color {
  BLACK,
  WHITE,
}

function intialChessPieces() {
  const pieces: Piece[] = [];
  for (let p = 0; p < 2; p++) {
    const color = p === 0 ? Color.BLACK : Color.WHITE;
    const type = color === Color.BLACK ? "b" : "w";
    const y = p === 0 ? 7 : 0;

    pieces.push(
      {
        image: `assets/images/rook_${type}.png`,
        positionX: 0,
        positionY: y,
        type: PieceType.ROOK,
        color: color,
      },
      {
        image: `assets/images/rook_${type}.png`,
        positionX: 7,
        positionY: y,
        type: PieceType.ROOK,
        color: color,
      },
      {
        image: `assets/images/knight_${type}.png`,
        positionX: 1,
        positionY: y,
        type: PieceType.KNIGHT,
        color: color,
      },
      {
        image: `assets/images/knight_${type}.png`,
        positionX: 6,
        positionY: y,
        type: PieceType.KNIGHT,
        color: color,
      },
      {
        image: `assets/images/bishop_${type}.png`,
        positionX: 2,
        positionY: y,
        type: PieceType.BISHOP,
        color: color,
      },
      {
        image: `assets/images/bishop_${type}.png`,
        positionX: 5,
        positionY: y,
        type: PieceType.BISHOP,
        color: color,
      },
      {
        image: `assets/images/queen_${type}.png`,
        positionX: 3,
        positionY: y,
        type: PieceType.QUEEN,
        color: color,
      },
      {
        image: `assets/images/king_${type}.png`,
        positionX: 4,
        positionY: y,
        type: PieceType.KING,
        color: color,
      }
    );
  }

  for (let i = 0; i < 8; i++) {
    pieces.push({
      image: "assets/images/pawn_b.png",
      positionX: i,
      positionY: 6,
      type: PieceType.PAWN,
      color: Color.BLACK,
    });
  }

  for (let i = 0; i < 8; i++) {
    pieces.push({
      image: "assets/images/pawn_w.png",
      positionX: i,
      positionY: 1,
      type: PieceType.PAWN,
      color: Color.WHITE,
    });
  }

  return pieces;
}

const Chessboard = () => {
  const chessboardRef = useRef<HTMLDivElement>(null);

  // Active chess piece info
  const [activeChessPiece, setActiveChessPiece] = useState<HTMLElement | null>(
    null
  );
  const [activePieceX, setActivePieceX] = useState(0);
  const [activePieceY, setActivePieceY] = useState(0);

  // Referee of the game to follow the rules
  const arbiter = new Arbiter();

  // Array of pieces on the board
  const [pieces, setPieces] = useState(intialChessPieces());

  const board = [];

  // Inititalize board with pieces
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
      element.style.zIndex = "10";

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

  const calculateCurrentPos = (
    mouseX: number,
    mouseY: number
  ): { x: number; y: number } => {
    const chessboard = chessboardRef.current;

    if (chessboard) {
      const x = Math.floor((mouseX - chessboard?.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((mouseY - chessboard.offsetTop - 800) / 100)
      );
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

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
    activeChessPiece?.style.removeProperty("z-index");

    const { x: destX, y: destY } = calculateCurrentPos(e.clientX, e.clientY);

    const currentPiece = pieces.find(
      (piece) =>
        piece.positionX === activePieceX && piece.positionY === activePieceY
    )!;

    const isValidMove = arbiter.isValidMove(
      activePieceX,
      activePieceY,
      destX,
      destY,
      currentPiece.type,
      currentPiece.color,
      pieces
    );

    if (isValidMove) {
      // If destination is attacked
      const attackedPieceIndex = pieces.findIndex(
        (piece) => piece.positionX === destX && piece.positionY === destY
      );
      if (attackedPieceIndex !== -1) {
        pieces.splice(attackedPieceIndex, 1);
      }

      // Update current piece
      currentPiece.positionX = destX;
      currentPiece.positionY = destY;
      setPieces([...pieces]);
    } else {
      if (activeChessPiece) {
        activeChessPiece.style.position = "relative";
        activeChessPiece.style.removeProperty("top");
        activeChessPiece.style.removeProperty("left");
      }
    }

    setActiveChessPiece(null);
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
