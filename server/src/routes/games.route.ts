import GamesController from '@/controllers/games.controller';
import { CreateOrUpdateGameDto } from '@/dtos/games.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class GameRoutes implements Routes {
  public path = '/games';
  public router = Router();
  public gamesController = new GamesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, validationMiddleware(CreateOrUpdateGameDto, 'body'), authMiddleware, this.gamesController.createGame);
    this.router.get(`${this.path}/`, authMiddleware, this.gamesController.getAllGamesOfUser);

    this.router.get(`${this.path}/:id`, this.gamesController.getGameById);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateOrUpdateGameDto, 'body'), this.gamesController.updateGame);
    this.router.delete(`${this.path}/:id`, this.gamesController.deleteGame);
  }
}

export default GameRoutes;
