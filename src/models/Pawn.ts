import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";

export class Pawn extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.PAWN;
    this.image = `assets/images/pawn_${color}.png`;
  }

  isValidMove(destination: Position): boolean {
    return true;
  }

  updatePossibleMoves(): void {
    return;
  }

  clone(): Piece {
    return new Pawn(this.position, this.color);
  }
}
