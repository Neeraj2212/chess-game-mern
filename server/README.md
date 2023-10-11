
### Chess Game Server
This is the server-side code for the Chess Game web application. It is built using Node.js and Express.js and MongoDB.

### Documentation
The documentation for the server can be found [here](https://documenter.getpostman.com/view/16239037/2s9YJjRJmU).

### Postman Collection
The Postman collection for the server can be found [here](https://www.postman.com/material-geologist-22258806/workspace/chess-game-api/collection/16239037-fe200a86-c35e-469d-b487-4eb1e467954b?action=share&creator=16239037).

### How to run the server
1. Install the dependencies using `npm install`
2. Add following environment variables in a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=<your_mongodb_uri>
```
3. Run the server using `npm run dev`
4. The server will be running on `http://localhost:5000/`

### Folder Structure

```
server
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.ts
│   ├── config
│   │   └── index.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── games.controller.ts
│   │   └── index.controller.ts
│   ├── databases
│   │   └── index.ts
│   ├── dtos
│   │   ├── games.dto.ts
│   │   └── users.dto.ts
│   ├── exceptions
│   │   └── HttpException.ts
│   ├── interfaces
│   │   ├── auth.interface.ts
│   │   ├── games.interface.ts
│   │   ├── routes.interface.ts
│   │   └── users.interface.ts
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models
│   │   ├── games.model.ts
│   │   └── users.model.ts
│   ├── routes
│   │   ├── auth.route.ts
│   │   ├── games.route.ts
│   │   └── index.route.ts
│   ├── server.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   └── games.service.ts
│   └── utils
│       ├── util.ts
│       └── validateEnv.ts
└── tsconfig.json

```

- The `src` folder contains the source code of the project
- The `config` folder contains the configuration of the server.
- The `controllers` folder contains the controllers of the server. Each controller is responsible for handling the requests to a specific route.
- The `databases` folder contains the database connection.
- The `dtos` folder contains the data transfer objects used in the server.
- The `exceptions` folder contains the custom exceptions used in the server.
- The `interfaces` folder contains the interfaces used in the server.
- The `middlewares` folder contains the middlewares used in the server.
- The `models` folder contains the models of the database.
- The `routes` folder contains the routes of the server.
- The `services` folder contains the services of the server.
- The `utils` folder contains the utility functions used in the server.
  


