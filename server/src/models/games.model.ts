import { Game } from '@/interfaces/games.interface';
import { model, Schema, Document } from 'mongoose';

const pieceSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'],
  },
  color: {
    type: String,
    required: true,
    enum: ['w', 'b'],
  },
  position: {
    type: {
      x: Number,
      y: Number,
    },
    required: true,
  },
});

const gameSchema: Schema = new Schema({
  gameId: {
    type: String,
    required: true,
  },
  piecesOnBoard: {
    type: [pieceSchema],
    required: true,
  },
  fallenPieces: {
    type: [pieceSchema],
    required: true,
  },
  playerTurn: {
    type: String,
    required: true,
    enum: ['w', 'b'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

gameSchema.index({ gameId: 1, userId: 1 }, { unique: true });

const gameModel = model<Game & Document>('Game', gameSchema);

export default gameModel;
