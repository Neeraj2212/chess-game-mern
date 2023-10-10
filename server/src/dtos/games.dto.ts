import { PieceCharacteristics } from '@/interfaces/games.interface';
import { IsArray, IsString, isArray } from 'class-validator';

export class CreateOrUpdateGameDto {
  @IsString()
  public gameId: string;

  @IsArray()
  public piecesOnBoard: Array<PieceCharacteristics>;

  @IsArray()
  public fallenPieces: Array<PieceCharacteristics>;

  @IsString()
  public playerTurn: string;
}
