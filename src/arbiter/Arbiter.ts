import { Color, Piece, PieceType, Position } from "../../helper/Constants";

export default class Arbiter {
  isTileOccupied(pos: Position, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (piece) => piece.position.x === pos.x && piece.position.y === pos.y
    );
    return !!piece;
  }

  isTileOccupiedByOpponent(
    pos: Position,
    boardState: Piece[],
    pieceColor: Color
  ): boolean {
    const piece = boardState.find(
      (piece) =>
        piece.position.x === pos.x &&
        piece.position.y === pos.y &&
        piece.color !== pieceColor
    );

    return !!piece;
  }

  isValidMove(
    srcPosition: Position,
    destPosition: Position,
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
        srcPosition.x === destPosition.x &&
        srcPosition.y === specialRow &&
        destPosition.y - srcPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.isTileOccupied(destPosition, boardState) &&
          !this.isTileOccupied(
            { x: destPosition.x, y: destPosition.y - pawnDirection },
            boardState
          )
        ) {
          return true;
        }
      }
      // Single step forwarding
      else if (
        srcPosition.x === destPosition.x &&
        destPosition.y - srcPosition.y === pawnDirection
      ) {
        if (!this.isTileOccupied(destPosition, boardState)) {
          return true;
        }
      }
      // ATTACK LOGIC
      else if (
        (destPosition.x - srcPosition.x === 1 ||
          destPosition.x - srcPosition.x === -1) &&
        destPosition.y - srcPosition.y === pawnDirection
      ) {
        // ATTACK ON BOTTOM/UPPER LEFT/RIGHT
        if (
          this.isTileOccupiedByOpponent(destPosition, boardState, pieceColor)
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
