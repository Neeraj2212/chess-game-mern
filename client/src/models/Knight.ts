import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";
import { Board } from "./Board";

export class Knight extends Piece {
  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.KNIGHT;
    this.image = `assets/images/knight_${color}.png`;
  }

  updatePossibleMoves(board: Board): void {
    const possibleMoves = [];
    if (this.color !== board.playerTurn) return;
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
            possibleMoves.push(nextPosition);
          }
        } else {
          possibleMoves.push(nextPosition);
        }
      }
    }

    this.possibleMoves = possibleMoves;
  }

  clone(): Piece {
    return new Knight(this.position, this.color);
  }
}
