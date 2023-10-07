import { Color, Piece, PieceType } from "../components/Chessboard/Chessboard";

export default class Arbiter {
  isTileOccupied(posX: number, posY: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (piece) => piece.positionX === posX && piece.positionY === posY
    );

    return !!piece;
  }

  isTileOccupiedByOpponent(
    posX: number,
    posY: number,
    boardState: Piece[],
    pieceColor: Color
  ): boolean {
    const piece = boardState.find(
      (piece) =>
        piece.positionX === posX &&
        piece.positionY === posY &&
        piece.color !== pieceColor
    );

    return !!piece;
  }

  isValidMove(
    srcX: number,
    srcY: number,
    destX: number,
    destY: number,
    pieceType: PieceType,
    pieceColor: Color,
    boardState: Piece[]
  ): boolean {
    // Rules for Pawn
    if (pieceType === PieceType.PAWN) {
      const specialRow = pieceColor === Color.WHITE ? 1 : 6;
      const pawnDirection = pieceColor === Color.WHITE ? 1 : -1;

      // MOVEMENT LOGIC
      // Check if pawn is using its first move
      if (
        srcX === destX &&
        srcY === specialRow &&
        destY - srcY === 2 * pawnDirection
      ) {
        if (
          !this.isTileOccupied(destX, destY, boardState) &&
          !this.isTileOccupied(destX, destY - pawnDirection, boardState)
        ) {
          return true;
        }
      }
      // Single step forwarding
      else if (srcX === destX && destY - srcY === pawnDirection) {
        if (!this.isTileOccupied(destX, destY, boardState)) {
          return true;
        }
      }
      // ATTACK LOGIC
      else if (
        (destX - srcX === 1 || destX - srcX === -1) &&
        destY - srcY === pawnDirection
      ) {
        // ATTACK ON BOTTOM/UPPER LEFT/RIGHT
        if (
          this.isTileOccupiedByOpponent(destX, destY, boardState, pieceColor)
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
