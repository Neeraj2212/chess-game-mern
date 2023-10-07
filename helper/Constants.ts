// INTERFACES
export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  color: Color;
}

export interface Position {
  x: number;
  y: number;
}

export enum PieceType {
  BISHOP,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
}

export enum Color {
  BLACK,
  WHITE,
}

// CONSTANTS
export const GRID_SIZE = 100;
export const GRID_CENTER = 50;
