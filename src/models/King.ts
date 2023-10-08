import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";

export class King extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.KING;
    this.image = `assets/images/king_${color}.png`;
  }

  isValidMove(destination: Position): boolean {
    return true;
  }

  updatePossibleMoves(): void {
    return;
  }

  clone(): Piece {
    return new King(this.position, this.color);
  }
}
