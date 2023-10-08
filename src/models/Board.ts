import { Color } from "../../helpers/Constants";
import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { BoardState } from "@helpers/Constants";
import { Queen } from "./Queen";
import { Rook } from "./Rook";

export class Board {
  boardState: BoardState;

  constructor() {
    this.boardState = [];
    for (let i = 0; i < 8; i++) {
      this.boardState.push([]);
      for (let j = 0; j < 8; j++) {
        this.boardState[i].push(undefined);
      }
    }
  }

  placeInitialPieces() {
    for (let p = 0; p < 2; p++) {
      const color = p === 0 ? Color.BLACK : Color.WHITE;
      const y = p === 0 ? 7 : 0;

      this.boardState[0][y] = new Rook({ x: 0, y: y }, color);
      this.boardState[7][y] = new Rook({ x: 7, y: y }, color);
      this.boardState[1][y] = new Knight({ x: 1, y: y }, color);
      this.boardState[6][y] = new Knight({ x: 6, y: y }, color);
      this.boardState[2][y] = new Bishop({ x: 2, y: y }, color);
      this.boardState[5][y] = new Bishop({ x: 5, y: y }, color);
      this.boardState[3][y] = new Queen({ x: 3, y: y }, color);
      this.boardState[4][y] = new King({ x: 4, y: y }, color);
    }

    for (let i = 0; i < 8; i++) {
      this.boardState[i][1] = new Pawn({ x: i, y: 1 }, Color.BLACK);
      this.boardState[i][6] = new Pawn({ x: i, y: 6 }, Color.WHITE);
    }
  }
}
