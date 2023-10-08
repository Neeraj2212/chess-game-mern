import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";

export class Knight extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.KNIGHT;
    this.image = `assets/images/knight_${color}.png`;
  }

  isValidMove(destination: Position): boolean {
    return true;
  }

  updatePossibleMoves(): void {
    return;
  }

  clone(): Piece {
    return new Knight(this.position, this.color);
  }
}
