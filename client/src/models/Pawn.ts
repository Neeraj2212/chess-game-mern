import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";
import { Board } from "./Board";

export class Pawn extends Piece {
  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.PAWN;
    this.image = `assets/images/pawn_${color}.png`;
  }

  updatePossibleMoves(board: Board): void {
    const possibleMoves = [];
    if (this.color !== board.playerTurn) return;
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
      possibleMoves.push({
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
      possibleMoves.push({
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
      possibleMoves.push({
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
      possibleMoves.push({
        x: this.position.x + 1,
        y: this.position.y + pawnDirection,
      });
    }

    this.possibleMoves = possibleMoves;
  }

  clone(): Piece {
    return new Pawn(this.position, this.color);
  }
}
