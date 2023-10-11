import { SavedGame } from "@helpers/Constants";
import { Board } from "@src/models/Board";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type GameContextType = {
  board: Board;
  openStartGameModal: boolean;
  savedGames: SavedGame[];
  showGameOverModal: boolean;
  setShowGameOverModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  showGameOverModal: false,
  setShowGameOverModal: () => {},
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
  const [isGameFinished, setIsGameFinished] = useState(true);

  // Show controls for game over modal
  const [showGameOverModal, setShowGameOverModal] = useState(false);

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
    if (!isGameFinished) {
      saveCurrentGame();
    }
    setShowGameOverModal(false);
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
      setShowGameOverModal(false);
      fetchSavedGamesOfUser();
      setIsGameFinished(false);
      cb && cb();
    }
  };

  const saveCurrentGame = async () => {
    // If Current Game is finished, don't save it
    if (isGameFinished) {
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
      setShowGameOverModal(false);
      setIsGameFinished(false);
    }
  };

  const deleteGame = async (gameData: SavedGame, onFinish: boolean = false) => {
    // Delete Game progess in the database
    const response = await axios
      .delete(`/api/games/${gameData._id}`)
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    if (response && response.data) {
      !onFinish && toast.success("Game deleted successfully!");
      fetchSavedGamesOfUser();
    }
  };

  const deleteSavedGame = async (gameData: SavedGame) => {
    // Check if game is in progress
    if (gameData._id === dbGameId) {
      toast.warn("You can't delete a game that is in progress!");
      return;
    }

    // Delete Game from the database
    deleteGame(gameData);
  };

  // Remove current game from database after finishing it
  const deleteGameOnFinish = async () => {
    setIsGameFinished(true);
    deleteGame({ _id: dbGameId!, gameId: board.gameId }, true);
    dbGameId = null;
    localStorage.removeItem("_gameId");
    fetchSavedGamesOfUser();
  };

  return (
    <GameContext.Provider
      value={{
        board,
        openStartGameModal,
        savedGames,
        showGameOverModal,
        setShowGameOverModal,
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
