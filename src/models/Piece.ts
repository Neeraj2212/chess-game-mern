import { Color, PieceType, Position } from "@helpers/Constants";
import { Board } from "./Board";

export abstract class Piece {
  abstract image: string;
  position: Position;
  abstract type: PieceType;
  color: Color;
  possibleMoves: Position[] = [];

  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    this.position = position;
    this.color = color;
    this.possibleMoves = possibleMoves;
  }

  getPossibleMoves(board: Board): Position[] {
    this.updatePossibleMoves(board);
    return this.possibleMoves;
  }

  abstract isValidMove(destination: Position, board: Board): boolean;
  abstract updatePossibleMoves(board: Board): void;
  abstract clone(): Piece;
}
