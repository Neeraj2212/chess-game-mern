import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class GameRoutes implements Routes {
  public path = '/games';
  public router = Router();
  public gamesController = new GamesController();

  constructor() {
    this.router.route(this.path);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.gamesController.createGame);
    this.router.get('/', this.gamesController.getAllGamesOfUser);

    this.router.get('/:id', this.gamesController.getGameById);
    this.router.put('/:id', this.gamesController.updateGame);
    this.router.delete('/:id', this.gamesController.deleteGame);
  }
}
