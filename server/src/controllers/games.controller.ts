import { CreateOrUpdateGameDto } from '@/dtos/games.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import GameService from '@/services/games.service';
import { NextFunction, Request, Response } from 'express';

class GamesController {
  public gameService = new GameService();

  public createGame = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const gameData: CreateOrUpdateGameDto = req.body;
      const userId: string = req.user._id;
      const createGameData = await this.gameService.createGame(gameData, userId);

      res.status(201).json({ data: createGameData, message: 'createGame' });
    } catch (error) {
      next(error);
    }
  };

  public getAllGamesOfUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user._id;
      const findAllGamesData = await this.gameService.getAllGamesOfUser(userId);

      res.status(200).json({ data: findAllGamesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getGameById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gameId: string = req.params.id;
      const findOneGameData = await this.gameService.getGameById(gameId);

      res.status(200).json({ data: findOneGameData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gameId: string = req.params.id;
      const gameData: CreateOrUpdateGameDto = req.body;
      const updateGameData = await this.gameService.updateGame(gameId, gameData);

      res.status(200).json({ data: updateGameData, message: 'update' });
    } catch (error) {
      next(error);
    }
  };

  public deleteGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gameId: string = req.params.id;
      const deleteGameData = await this.gameService.deleteGame(gameId);

      res.status(200).json({ data: deleteGameData, message: 'delete' });
    } catch (error) {
      next(error);
    }
  };
}

export default GamesController;
