import { Board } from "@src/models/Board";
import { useRef, useState } from "react";
import { GRID_CENTER, GRID_SIZE, Position } from "@helpers/Constants";
import Tile from "@components/Tile/Tile";
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

  const [board, setBoard] = useState(new Board());

  const boardElements = [];

  // Inititalize board with pieces
  for (let j = 7; j >= 0; j--)
    for (let i = 0; i <= 7; i++) {
      const piece = board.getPieceAt({ x: i, y: j });
      const image = piece ? piece.image : undefined;
      boardElements.push(
        <Tile key={`${i}-${j}`} number={i + j} image={image} />
      );
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
    const currentPiece = board.getPieceAt(activePiecePos);

    if (currentPiece) {
      const isValidMove = currentPiece.isValidMove(destPos, board);
      if (isValidMove) {
        board.movePiece(activePiecePos, destPos);
        setBoard(board.clone());
      } else {
        if (activeChessPiece) {
          activeChessPiece.style.position = "relative";
          activeChessPiece.style.removeProperty("top");
          activeChessPiece.style.removeProperty("left");
        }
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
      {boardElements}
    </div>
  );
};

export default Chessboard;
