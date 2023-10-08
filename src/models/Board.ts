import { Color, Position } from "../../helpers/Constants";
import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { BoardState } from "@helpers/Constants";
import { Queen } from "./Queen";
import { Rook } from "./Rook";
import { Piece } from "./Piece";

export class Board {
  boardState: BoardState;
  fallenPieces: Piece[] = [];

  constructor(boardState?: BoardState, fallenPieces?: Piece[]) {
    this.boardState = boardState || this.getInitialPieces();
    this.fallenPieces = fallenPieces || [];
  }

  getInitialPieces() {
    const state: BoardState = [];
    for (let i = 0; i < 8; i++) {
      state.push([]);
      for (let j = 0; j < 8; j++) {
        state[i].push(undefined);
      }
    }

    for (let p = 0; p < 2; p++) {
      const color = p === 0 ? Color.BLACK : Color.WHITE;
      const y = p === 0 ? 7 : 0;

      state[0][y] = new Rook({ x: 0, y: y }, color);
      state[7][y] = new Rook({ x: 7, y: y }, color);
      state[1][y] = new Knight({ x: 1, y: y }, color);
      state[6][y] = new Knight({ x: 6, y: y }, color);
      state[2][y] = new Bishop({ x: 2, y: y }, color);
      state[5][y] = new Bishop({ x: 5, y: y }, color);
      state[3][y] = new Queen({ x: 3, y: y }, color);
      state[4][y] = new King({ x: 4, y: y }, color);
    }

    for (let i = 0; i < 8; i++) {
      state[i][1] = new Pawn({ x: i, y: 1 }, Color.WHITE);
      state[i][6] = new Pawn({ x: i, y: 6 }, Color.BLACK);
    }
    return state;
  }

  getPieceAt(position: Position): Piece | undefined {
    return this.boardState[position.x][position.y];
  }

  movePiece(src: Position, dest: Position) {
    const piece = this.getPieceAt(src);
    const destPiece = this.getPieceAt(dest);
    if (destPiece) {
      this.fallenPieces.push(destPiece);
    }
    if (!piece) {
      throw new Error("No piece found at source position");
    }
    this.boardState[src.x][src.y] = undefined;
    this.boardState[dest.x][dest.y] = piece;
    piece.position = dest;
  }

  isTileOccupied(pos: Position): boolean {
    const piece = this.getPieceAt(pos);
    return !!piece;
  }

  isTileOccupiedByOpponent(pos: Position, pieceColor: Color): boolean {
    const piece = this.getPieceAt(pos);
    return !!piece && piece.color !== pieceColor;
  }

  clone(): Board {
    const boardState = this.boardState.map((row) => {
      return row.map((piece) => {
        if (piece) {
          return piece.clone();
        } else {
          return undefined;
        }
      });
    });

    const fallenPieces = this.fallenPieces.map((piece) => piece.clone());
    return new Board(boardState, fallenPieces);
  }
}
