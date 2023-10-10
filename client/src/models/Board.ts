import {
  BoardState,
  PieceCharachteristics,
  PieceType,
  SavedGameState,
} from "@helpers/Constants";
import { Color, Position } from "@helpers/Constants";
import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Queen } from "./Queen";
import { Rook } from "./Rook";

export class Board {
  gameId: string;
  private _boardState: BoardState;
  private _fallenPieces: Piece[] = [];
  playerTurn: Color = Color.WHITE;

  constructor(
    gameId?: string,
    boardState?: BoardState,
    fallenPieces?: Piece[],
    playerTurn?: Color
  ) {
    this.gameId = gameId || "";
    this._boardState = boardState || this.getInitialPieces();
    this._fallenPieces = fallenPieces || [];
    this.playerTurn = playerTurn || Color.WHITE;
  }

  get boardState(): BoardState {
    return this._boardState;
  }

  get fallenPieces(): Piece[] {
    return this._fallenPieces;
  }

  saveGame(): SavedGameState {
    // Get basic characteristics of all pieces on board instead of board state to save space in db
    const piecesOnBoard = this._boardState
      .flat()
      .filter((piece) => !!piece)
      .map(
        (piece) => piece && piece.getCharacteristics()
      ) as PieceCharachteristics[];

    const fallenPieces = this._fallenPieces.map((piece) =>
      piece.getCharacteristics()
    );

    return {
      gameId: this.gameId,
      piecesOnBoard: piecesOnBoard || [],
      fallenPieces,
      playerTurn: this.playerTurn,
    };
  }

  loadGame(gameState: SavedGameState) {
    this.gameId = gameState.gameId;
    this.playerTurn = gameState.playerTurn;
    this._fallenPieces = gameState.fallenPieces.map((piece) => {
      return this.createPieceByType(piece.type, piece.position, piece.color);
    });

    this._boardState = this.initializeEmptyBoard();
    gameState.piecesOnBoard.forEach((piece) => {
      const newPiece = this.createPieceByType(
        piece.type,
        piece.position,
        piece.color
      );
      this._boardState[piece.position.x][piece.position.y] = newPiece;
    });
  }

  isPawnPromotionAllowed(piece: Piece, dest: Position): boolean {
    const endRow = piece.color === Color.WHITE ? 7 : 0;
    return piece instanceof Pawn && dest.y === endRow;
  }

  promotePawn(piece: Piece, type: PieceType) {
    const position = piece.position;
    const color = piece.color;
    const newPiece = this.createPieceByType(type, position, color);
    this._boardState[position.x][position.y] = newPiece;
  }

  togglePlayerTurn() {
    this.playerTurn =
      this.playerTurn === Color.WHITE ? Color.BLACK : Color.WHITE;
  }

  private initializeEmptyBoard() {
    const state: BoardState = [];
    for (let i = 0; i < 8; i++) {
      state.push([]);
      for (let j = 0; j < 8; j++) {
        state[i].push(undefined);
      }
    }
    return state;
  }

  getInitialPieces() {
    const state: BoardState = this.initializeEmptyBoard();

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
    return this.isTileValid(position)
      ? this._boardState[position.x][position.y]
      : undefined;
  }

  isGameOver(): boolean {
    const kings = this._fallenPieces.filter((piece) => {
      return piece instanceof King;
    });
    return kings.length > 0;
  }

  resetBoard() {
    this._boardState = this.getInitialPieces();
    this._fallenPieces = [];
    this.playerTurn = Color.WHITE;
  }

  movePiece(src: Position, dest: Position) {
    const piece = this.getPieceAt(src);
    const destPiece = this.getPieceAt(dest);
    if (destPiece) {
      this._fallenPieces.push(destPiece);
    }
    if (!piece) {
      throw new Error("No piece found at source position");
    }
    this._boardState[src.x][src.y] = undefined;
    this._boardState[dest.x][dest.y] = piece;

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

  isTileValid(pos: Position): boolean {
    return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
  }

  createPieceByType(type: PieceType, position: Position, color: Color) {
    switch (type) {
      case PieceType.PAWN:
        return new Pawn(position, color);
      case PieceType.ROOK:
        return new Rook(position, color);
      case PieceType.KNIGHT:
        return new Knight(position, color);
      case PieceType.BISHOP:
        return new Bishop(position, color);
      case PieceType.QUEEN:
        return new Queen(position, color);
      case PieceType.KING:
        return new King(position, color);
    }
  }

  clone(): Board {
    const boardState = this._boardState.map((row) => {
      return row.map((piece) => {
        if (piece) {
          return piece.clone();
        } else {
          return undefined;
        }
      });
    });

    const fallenPieces = this._fallenPieces.map((piece) => piece.clone());
    return new Board(this.gameId, boardState, fallenPieces, this.playerTurn);
  }
}
