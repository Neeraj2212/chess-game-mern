import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";
import { Board } from "./Board";

export class Knight extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.KNIGHT;
    this.image = `assets/images/knight_${color}.png`;
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
    const directions = [
      { x: 1, y: 2 },
      { x: 1, y: -2 },
      { x: -1, y: 2 },
      { x: -1, y: -2 },
      { x: 2, y: 1 },
      { x: 2, y: -1 },
      { x: -2, y: 1 },
      { x: -2, y: -1 },
    ];
    for (const direction of directions) {
      const nextPosition: Position = {
        x: this.position.x + direction.x,
        y: this.position.y + direction.y,
      };
      if (board.isTileValid(nextPosition)) {
        if (board.isTileOccupied(nextPosition)) {
          if (board.getPieceAt(nextPosition)?.color !== this.color) {
            this.possibleMoves.push(nextPosition);
          }
        } else {
          this.possibleMoves.push(nextPosition);
        }
      }
    }
  }

  clone(): Piece {
    return new Knight(this.position, this.color);
  }
}
