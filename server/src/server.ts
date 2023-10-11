import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import GameRoutes from './routes/games.route';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new GameRoutes()]);

app.listen();
