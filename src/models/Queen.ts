import { PieceType, Position, Color } from "@helpers/Constants";
import { Piece } from "./Piece";

export class Queen extends Piece {
  image: string;
  type: PieceType;

  constructor(position: Position, color: Color) {
    super(position, color);
    this.type = PieceType.QUEEN;
    this.image = `assets/images/queen_${color}.png`;
  }

  isValidMove(destination: Position): boolean {
    return true;
  }

  updatePossibleMoves(): void {
    return;
  }

  clone(): Piece {
    return new Queen(this.position, this.color);
  }
}
