import { Piece } from "@src/models/Piece";

export interface Position {
  x: number;
  y: number;
}

export enum PieceType {
  PAWN = "pawn",
  BISHOP = "bishop",
  KNIGHT = "knight",
  ROOK = "rook",
  QUEEN = "queen",
  KING = "king",
}

export enum Color {
  BLACK = "b",
  WHITE = "w",
}

export interface User {
  _id: string;
  userName: string;
}

export interface SavedGame {
  _id: string;
  gameId: string;
}

export interface SavedGameState {
  gameId: string;
  piecesOnBoard: PieceCharachteristics[];
  fallenPieces: PieceCharachteristics[];
  playerTurn: Color;
}

export interface PieceCharachteristics {
  type: PieceType;
  color: Color;
  position: Position;
}

export type BoardState = (Piece | undefined)[][];

// CONSTANTS
export const GRID_SIZE = 100;
export const GRID_CENTER = 50;
