import { SavedGame } from "@helpers/Constants";
import { Board } from "@src/models/Board";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type GameContextType = {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  startNewGame: () => void;
  saveCurrentGame: () => void;
  openStartGameModal: boolean;
  updateGameId: (gameId: string, cb?: () => void) => void;
  savedGames: SavedGame[];
};

const initialContext: GameContextType = {
  board: new Board(),
  setBoard: () => {},
  saveCurrentGame: () => {},
  startNewGame: () => {},
  openStartGameModal: true,
  updateGameId: () => {},
  savedGames: [],
};

// Game Context to easily share board state between components
export const GameContext = createContext<GameContextType>(initialContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<Board>(new Board());
  const [openStartGameModal, setOpenStartGameModal] = useState(true);
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);

  let dbGameId = localStorage.getItem("_gameId");

  const fetchSavedGamesOfUser = async () => {
    const response = await axios.get("/api/games").catch((error) => {
      console.log(error.message);
    });

    if (response && response.data) {
      console.log(response.data.data);
      setSavedGames(response.data.data);
    }
  };

  // Load Saved games of the user
  useEffect(() => {
    fetchSavedGamesOfUser();
  }, []);

  const startNewGame = () => {
    setOpenStartGameModal(true);
  };

  const updateGameId = async (gameId: string, cb?: () => void) => {
    const board = new Board(gameId);

    // Create instance of game in the database
    const response = await axios
      .post("/api/games", board.saveGame())
      .catch((error) => {
        console.log(error.message);
        toast.error(error.response.data.message);
      });

    if (response && response.data) {
      toast.success("Game created successfully!");
      dbGameId = response.data.data._id;
      localStorage.setItem("_gameId", response.data.data._id);
      setBoard(board);
      setOpenStartGameModal(false);
      cb && cb();
    }
  };

  const saveCurrentGame = async () => {
    // Save Game progess in the database
    const response = await axios
      .put(`/api/games/${dbGameId}`, board.saveGame())
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    if (response && response.data) {
      toast.success("Game saved successfully!");
    }
  };

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        startNewGame,
        openStartGameModal,
        updateGameId,
        saveCurrentGame,
        savedGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
