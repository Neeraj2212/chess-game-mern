import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";

export class Bishop extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.BISHOP;
    this.image = `assets/images/bishop_${color}.png`;
  }

  isValidMove(destination: Position): boolean {
    return true;
  }

  updatePossibleMoves(): void {
    return;
  }

  clone(): Piece {
    return new Bishop(this.position, this.color);
  }
}
