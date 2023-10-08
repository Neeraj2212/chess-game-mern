import { Board } from "@src/models/Board";
import React, { createContext, useState } from "react";

type GameContextType = {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
};

const initialContext: GameContextType = {
  board: new Board(),
  setBoard: () => {},
};

// Game Context to easily share board state between components
export const GameContext = createContext<GameContextType>(initialContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<Board>(new Board());

  return (
    <GameContext.Provider value={{ board, setBoard }}>
      {children}
    </GameContext.Provider>
  );
};
