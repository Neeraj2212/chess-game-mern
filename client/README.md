### Chess Game Client
This is the client-side code for the Chess Game web application. It is built using React and TypeScript.

### Folder Structure

```
client
├── helpers
│   ├── Constants.ts
│   └── Utils.ts
├── index.html
├── package.json
├── package-lock.json
├── public
│   └── assets
│       └── images
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── components
│   │   ├── Chessboard
│   │   ├── FallenPiecesRack
│   │   ├── GameOptionsBoard
│   │   ├── Header
│   │   ├── Modal
│   │   ├── SavedGames
│   │   ├── Tile
│   │   └── Turn
│   ├── contexts
│   │   ├── GameContext.tsx
│   │   └── UserContext.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── models
│   │   ├── Bishop.ts
│   │   ├── Board.ts
│   │   ├── King.ts
│   │   ├── Knight.ts
│   │   ├── Pawn.ts
│   │   ├── Piece.ts
│   │   ├── Queen.ts
│   │   └── Rook.ts
│   └── pages
│       ├── ChessGame
│       ├── Login
│       └── SignUp
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

- The `public` folder contains the static images.
- The `src` folder contains the source code of the project
- The `components` folder contains reusable UI componenets used in the client.
- The `contexts` folder cotnains the React contexts that are used in the client to easily share common methods and variables accross all components.
- The `models` folder contains the models of the chess pieces and the board. It contains all pieces on board in form of classes and has methods to calculate and validate all possible moves for each piece.
- The `pages` folder contains the pages of the application. Each page is a React component that is rendered when the user navigates to a specific route.
- The `helpers` folder contains the constants and utility functions used in the client.

### How to run the client
1. Install the dependencies using `npm install`
2. Run the client using `npm run dev`
3. The client will be running on `http://localhost:5173/`
