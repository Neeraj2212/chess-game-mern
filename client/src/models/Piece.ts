import {
  Color,
  PieceCharachteristics,
  PieceType,
  Position,
} from "@helpers/Constants";
import { Board } from "./Board";

export abstract class Piece {
  private _image: string;
  private _position: Position;
  private _type: PieceType;
  private _color: Color;
  private _possibleMoves: Position[] = [];

  constructor(
    position: Position,
    color: Color,
    possibleMoves: Position[] = []
  ) {
    this._position = position;
    this._color = color;
    this._possibleMoves = possibleMoves;
    this._image = `assets/images/pawn_${color}.png`;
    this._type = PieceType.PAWN;
  }

  get image(): string {
    return this._image;
  }

  set image(image: string) {
    this._image = image;
  }

  get type(): PieceType {
    return this._type;
  }

  set type(type: PieceType) {
    this._type = type;
  }

  get position(): Position {
    return this._position;
  }

  set position(position: Position) {
    this._position = position;
  }

  get color(): Color {
    return this._color;
  }

  set possibleMoves(possibleMoves: Position[]) {
    this._possibleMoves = possibleMoves;
  }

  getPossibleMoves(board: Board): Position[] {
    this.updatePossibleMoves(board);
    return this._possibleMoves;
  }

  isValidMove(destination: Position, board: Board): boolean {
    if (this.color !== board.playerTurn) return false;
    this.updatePossibleMoves(board);
    for (const move of this._possibleMoves || []) {
      if (move.x === destination.x && move.y === destination.y) {
        return true;
      }
    }
    return false;
  }

  getCharacteristics(): PieceCharachteristics {
    return {
      type: this._type,
      color: this._color,
      position: this._position,
    };
  }

  abstract updatePossibleMoves(board: Board): void;
  abstract clone(): Piece;
}
