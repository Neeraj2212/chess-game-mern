import { useRef, useState } from "react";
import { GRID_CENTER, GRID_SIZE, Position } from "../../../helper/Constants";
import { intialChessPieces } from "../../../helper/Utils";
import Arbiter from "../../arbiter/Arbiter";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

const Chessboard = () => {
  const chessboardRef = useRef<HTMLDivElement>(null);
  // Active chess piece info
  const [activeChessPiece, setActiveChessPiece] = useState<HTMLElement | null>(
    null
  );
  const [activePiecePos, setActivePiecePos] = useState<Position>({
    x: -1,
    y: -1,
  });

  // Referee of the game to follow the rules
  const arbiter = new Arbiter();
  // Array of pieces on the board
  const [pieces, setPieces] = useState(intialChessPieces());

  const board = [];

  // Inititalize board with pieces
  for (let j = 7; j >= 0; j--)
    for (let i = 0; i <= 7; i++) {
      const piece = pieces.find(
        (piece) => piece.position.x === i && piece.position.y === j
      );
      const image = piece ? piece.image : undefined;

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

      const mousePositionX = posX - GRID_CENTER; // To make it relative to center
      const mousePostionY = posY - GRID_CENTER; // To make it relative to center

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

  // Function to calculate co-ordinates of mouse pointers
  const calculateCurrentPos = (mouseX: number, mouseY: number): Position => {
    const chessboard = chessboardRef.current;

    if (chessboard) {
      const x = Math.floor((mouseX - chessboard?.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((mouseY - chessboard.offsetTop - 800) / GRID_SIZE)
      );
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

  const grabPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const grabbedElement = e.target as HTMLDivElement;
    setActivePiecePos(calculateCurrentPos(e.clientX, e.clientY));
    setActiveChessPiece(grabbedElement);

    updateChessPieceLocation(grabbedElement, e.clientX, e.clientY);
  };

  const movePiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (activeChessPiece)
      updateChessPieceLocation(activeChessPiece, e.clientX, e.clientY);
  };

  const dropPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    activeChessPiece?.style.removeProperty("z-index");

    const destPos = calculateCurrentPos(e.clientX, e.clientY);

    const currentPiece = pieces.find(
      (piece) =>
        piece.position.x === activePiecePos.x &&
        piece.position.y === activePiecePos.y
    )!;

    const isValidMove = arbiter.isValidMove(
      activePiecePos,
      destPos,
      currentPiece.type,
      currentPiece.color,
      pieces
    );

    if (isValidMove) {
      // If destination is attacked
      const attackedPieceIndex = pieces.findIndex(
        (piece) =>
          piece.position.x === destPos.x && piece.position.y === destPos.y
      );
      if (attackedPieceIndex !== -1) {
        pieces.splice(attackedPieceIndex, 1);
      }

      // Update current piece
      currentPiece.position.x = destPos.x;
      currentPiece.position.y = destPos.y;
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
