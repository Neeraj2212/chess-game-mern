import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";

export class Rook extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.ROOK;
    this.image = `assets/images/rook_${color}.png`;
  }

  isValidMove(destination: Position): boolean {
    return true;
  }

  updatePossibleMoves(): void {
    return;
  }

  clone(): Piece {
    return new Rook(this.position, this.color);
  }
}
