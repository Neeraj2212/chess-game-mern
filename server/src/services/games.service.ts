import { CreateOrUpdateGameDto } from '@/dtos/games.dto';
import { HttpException } from '@/exceptions/HttpException';
import gameModel from '@/models/games.model';
import { isEmpty } from 'class-validator';

class GameService {
  public games = gameModel;

  public async createGame(gameData: CreateOrUpdateGameDto, userId: string) {
    if (isEmpty(gameData)) throw new HttpException(400, 'gameData is empty');

    const findGame = await this.games.findOne({ gameId: gameData.gameId, userId: userId });
    if (findGame) throw new HttpException(409, `This game ${gameData.gameId} already exists`);

    const createGameData = await this.games.create({ ...gameData, userId: userId });
    return createGameData;
  }

  public async getAllGamesOfUser(userId: string) {
    if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');

    const findGames = await this.games.find({ userId: userId }).select('gameId');
    return findGames;
  }

  public async getGameById(id: string) {
    if (isEmpty(id)) throw new HttpException(400, 'gameId is empty');

    const findGame = await this.games.findById(id);
    if (!findGame) throw new HttpException(404, `This game does not exist`);
    return findGame;
  }

  public async updateGame(id: string, gameData: CreateOrUpdateGameDto) {
    if (isEmpty(gameData)) throw new HttpException(400, 'gameData is empty');
    const updateGameById = await this.games.findByIdAndUpdate(id, gameData);
    if (!updateGameById) throw new HttpException(404, `This game ${gameData.gameId} does not exist`);

    return updateGameById;
  }

  public async deleteGame(id: string) {
    if (isEmpty(id)) throw new HttpException(400, 'gameId is empty');

    const deleteGameById = await this.games.findByIdAndDelete(id);
    if (!deleteGameById) throw new HttpException(404, `This game does not exist`);
    return deleteGameById;
  }
}

export default GameService;
