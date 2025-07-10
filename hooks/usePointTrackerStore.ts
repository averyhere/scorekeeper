import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Player = {
  name: string;
  points: number;
  status: "won" | "lost" | null;
};

export type PointTrackerState = {
  players: number | undefined;
  scoreboard: Player[] | [];
  pointer: number | undefined;
  timer: number;
  isPaused: boolean;
  setBoard: (board: Player[]) => void;
  setPointer: (playerIndex: number) => void;
  clearPointer: () => void;
  tick: () => void;
  pause: () => void;
  resume: () => void;
  newGame: () => void;
  reset: () => void;
  incrementPoints: (
    player: number,
    points: number,
    operation: "add" | "subtract",
  ) => void;

  addPlayer: (name: string, defaultPoints: number) => void;
  removePlayer: () => void;
  clearScores: () => void;
  gameStatus: "idle" | "playing" | "complete" | undefined;
  setGameStatus: (status: "idle" | "playing" | "complete") => void;
};

export const usePointTrackerStore = create<PointTrackerState>()(
  persist(
    (set) => ({
      players: undefined,
      scoreboard: [],
      pointer: undefined,
      timer: 0,
      isPaused: true,
      setBoard: (scoreboard) => set({ scoreboard }),
      setPointer: (playerIndex) => {
        set({
          pointer: playerIndex,
        });
      },
      clearPointer: () => set({ pointer: undefined }),
      tick: () =>
        set((state) => (state.isPaused ? state : { timer: state.timer + 1 })),
      pause: () => set({ isPaused: true }),
      resume: () => set({ isPaused: false }),
      newGame: () => {
        set({
          players: undefined,
          scoreboard: [],
          timer: 0,
          pointer: undefined,
          isPaused: true,
          gameStatus: "idle",
        });
      },
      reset: () => {
        set(() => ({
          scoreboard: [],
          timer: 0,
          isPaused: true,
          gameStatus: "idle",
        }));
      },
      incrementPoints: (
        playerIndex: number,
        points: number,
        operation: "add" | "subtract",
      ) => {
        set((state) => {
          if (operation === "add") {
            state.scoreboard[playerIndex].points =
              state.scoreboard[playerIndex].points + points;
          } else if (operation === "subtract") {
            state.scoreboard[playerIndex].points =
              state.scoreboard[playerIndex].points - points;
          }
          return {};
        });
      },
      addPlayer: (name: string, defaultPoints: number) => {
        console.log("addPlayer", name);
        set((state) => {
          if (typeof state.scoreboard === "undefined") state.scoreboard = [];
          return {
            scoreboard: [
              ...state.scoreboard,
              {
                name: name,
                points: defaultPoints,
                status: null,
              },
            ],
          };
        });
      },
      removePlayer: () => {
        set((state) => {
          const updated = state.scoreboard!.filter(
            (item, index) => index !== state.pointer,
          );
          return {
            scoreboard: updated,
            pointer: undefined,
          };
        });
      },
      clearScores: () => {},
      gameStatus: "idle",
      setGameStatus: (status: "idle" | "playing" | "complete") =>
        set({ gameStatus: status }),
    }),
    {
      name: "sudoku-game", // key in localStorage
    },
  ),
);
