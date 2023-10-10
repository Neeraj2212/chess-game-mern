export interface PieceCharacteristics {
  type: string;
  color: string;
  position: {
    x: number;
    y: number;
  };
}

export interface Game {
  gameId: string;
  piecesOnBoard: PieceCharacteristics[];
  fallenPieces: PieceCharacteristics[];
  playerTurn: string;
  userId: string;
}
