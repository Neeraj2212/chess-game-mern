import { Board } from "@src/models/Board";
import React, { createContext, useState } from "react";

type GameContextType = {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  startNewGame: () => void;
  openStartGameModal: boolean;
  updateGameId: (gameId: string) => void;
};

const initialContext: GameContextType = {
  board: new Board(),
  setBoard: () => {},
  startNewGame: () => {},
  openStartGameModal: true,
  updateGameId: () => {},
};

// Game Context to easily share board state between components
export const GameContext = createContext<GameContextType>(initialContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<Board>(new Board());
  const [openStartGameModal, setOpenStartGameModal] = useState(true);

  const startNewGame = () => {
    setOpenStartGameModal(true);
  };

  const updateGameId = (gameId: string) => {
    setBoard(new Board(gameId));
    setOpenStartGameModal(false);
  };

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        startNewGame,
        openStartGameModal,
        updateGameId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
