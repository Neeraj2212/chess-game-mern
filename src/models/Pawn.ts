import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";
import { Board } from "./Board";

export class Pawn extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.PAWN;
    this.image = `assets/images/pawn_${color}.png`;
  }

  isValidMove(destination: Position, board: Board): boolean {
    this.updatePossibleMoves(board);
    for (const move of this.possibleMoves) {
      if (move.x === destination.x && move.y === destination.y) {
        return true;
      }
    }
    return false;
  }

  updatePossibleMoves(board: Board): void {
    this.possibleMoves = [];
    const specialRow = this.color === Color.WHITE ? 1 : 6;
    const pawnDirection = this.color === Color.WHITE ? 1 : -1;

    // MOVEMENT LOGIC
    // Check if pawn is using its first move
    if (
      this.position.y === specialRow &&
      !board.isTileOccupied({
        x: this.position.x,
        y: this.position.y + 2 * pawnDirection,
      }) &&
      !board.isTileOccupied({
        x: this.position.x,
        y: this.position.y + pawnDirection,
      })
    ) {
      this.possibleMoves.push({
        x: this.position.x,
        y: this.position.y + 2 * pawnDirection,
      });
    }

    if (
      !board.isTileOccupied({
        x: this.position.x,
        y: this.position.y + pawnDirection,
      })
    ) {
      this.possibleMoves.push({
        x: this.position.x,
        y: this.position.y + pawnDirection,
      });
    }

    // ATTACK LOGIC
    if (
      this.position.x !== 0 &&
      board.isTileOccupiedByOpponent(
        {
          x: this.position.x - 1,
          y: this.position.y + pawnDirection,
        },
        this.color
      )
    ) {
      this.possibleMoves.push({
        x: this.position.x - 1,
        y: this.position.y + pawnDirection,
      });
    }

    if (
      this.position.x !== 7 &&
      board.isTileOccupiedByOpponent(
        {
          x: this.position.x + 1,
          y: this.position.y + pawnDirection,
        },
        this.color
      )
    ) {
      this.possibleMoves.push({
        x: this.position.x + 1,
        y: this.position.y + pawnDirection,
      });
    }
  }

  clone(): Piece {
    return new Pawn(this.position, this.color);
  }
}
