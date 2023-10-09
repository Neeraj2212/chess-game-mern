import { DB_DATABASE, DB_HOST, DB_PORT } from '@config';
import { ConnectOptions } from 'mongoose';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
};
