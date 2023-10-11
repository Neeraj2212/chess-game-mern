import { DB_DATABASE, DB_HOST, DB_PORT, MONGODB_URI } from '@config';

export const dbConnection = {
  url: MONGODB_URI || `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
};
