import { Color, PieceType, Position } from "@helpers/Constants";

export abstract class Piece {
  abstract image: string;
  position: Position;
  abstract type: PieceType;
  color: Color;
  possibleMoves?: Position[];

  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    this.position = position;
    this.color = color;
    this.possibleMoves = possibleMoves;
  }

  abstract isValidMove(destination: Position): boolean;
  abstract updatePossibleMoves(): void;
  abstract clone(): Piece;
}
