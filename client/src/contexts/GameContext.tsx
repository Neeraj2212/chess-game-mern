import { SavedGame } from "@helpers/Constants";
import { Board } from "@src/models/Board";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type GameContextType = {
  board: Board;
  openStartGameModal: boolean;
  savedGames: SavedGame[];
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  startNewGame: () => void;
  saveCurrentGame: () => void;
  updateGameId: (gameId: string, cb?: () => void) => void;
  deleteSavedGame: (gameData: SavedGame) => void;
  loadGame: (gameData: SavedGame) => void;
  deleteGameOnFinish: () => void;
};

const initialContext: GameContextType = {
  board: new Board(),
  openStartGameModal: true,
  savedGames: [],
  setBoard: () => {},
  saveCurrentGame: () => {},
  startNewGame: () => {},
  updateGameId: () => {},
  deleteSavedGame: () => {},
  loadGame: () => {},
  deleteGameOnFinish: () => {},
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
      fetchSavedGamesOfUser();
      cb && cb();
    }
  };

  const saveCurrentGame = async () => {
    // If Current Game is finished, don't save it
    if (!board.gameId) {
      toast.warn("You can't save a finished game!");
      return;
    }

    // Save Game progess in the database
    const response = await axios
      .put(`/api/games/${dbGameId}`, board.saveGame())
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    if (response && response.data) {
      toast.success("Game saved successfully!");
      fetchSavedGamesOfUser();
    }
  };

  const loadGame = async (gameData: SavedGame) => {
    // Load Game from the database
    const response = await axios
      .get(`/api/games/${gameData._id}`)
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    if (response && response.data) {
      toast.success("Game loaded successfully!");
      const board = new Board(gameData.gameId);
      board.loadGame(response.data.data);
      dbGameId = gameData._id;
      localStorage.setItem("_gameId", gameData._id);
      setBoard(board);
      setOpenStartGameModal(false);
    }
  };

  const deleteSavedGame = async (gameData: SavedGame) => {
    // Check if deleting current game
    if (gameData._id === dbGameId) {
      toast.warn("You can't delete the current game!");
      return;
    }

    // Delete Game progess in the database
    const response = await axios
      .delete(`/api/games/${gameData._id}`)
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    if (response && response.data) {
      toast.success("Game deleted successfully!");
      fetchSavedGamesOfUser();
    }
  };

  // Remove current game from database after finishing it
  const deleteGameOnFinish = async () => {
    deleteSavedGame({ _id: dbGameId!, gameId: board.gameId });
    localStorage.removeItem("_gameId");
    dbGameId = null;
    fetchSavedGamesOfUser();
  };

  return (
    <GameContext.Provider
      value={{
        board,
        openStartGameModal,
        savedGames,
        deleteGameOnFinish,
        setBoard,
        startNewGame,
        updateGameId,
        saveCurrentGame,
        deleteSavedGame,
        loadGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
