import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
  }
}

export default UsersRoute;
