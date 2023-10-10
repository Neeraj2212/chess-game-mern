export interface PieceCharacteristics {
  type: string;
  color: string;
  position: string;
}

export interface Game {
  gameId: string;
  piecesOnBoard: PieceCharacteristics[];
  fallenPieces: PieceCharacteristics[];
  playerTurn: string;
  userId: string;
}
