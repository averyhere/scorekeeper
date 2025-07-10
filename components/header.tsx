"use client";

import { useState } from "react";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePointTrackerStore } from "@/hooks/usePointTrackerStore";
import { Button } from "@/components/ui/button";

export function Header() {
  const { newGame, addPlayer } = usePointTrackerStore();
  const [defaultPoints, setDefaultPoints] = useState<number>(50);

  const handleAddPlayer = (formData: FormData) => {
    const newPlayerName = formData.get("newPlayerName") as string;

    addPlayer(newPlayerName, defaultPoints);
  };
  return (
    <header className="w-full p-2">
      <div className="w-full mx-auto py-4 flex gap-2 p-2 justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2">
            <h1 className="flex text-3xl md:text-4xl uppercase leading-none">
              <Link
                href="/"
                className="hover:underline transition-all text-foreground underline-offset-4 decoration-2 decoration-blue hover:text-pink"
              >
                Scorekeeper
              </Link>
            </h1>
          </div>
          {/* <NewGameButton
            variant="default"
            size="sm"
            className="hidden md:inline-flex"
          >
            New Game
          </NewGameButton>
          <ScoreboardButton
            variant="default"
            size="sm"
            className="hidden md:inline-flex"
          >
            Scoreboard
          </ScoreboardButton> */}
        </div>
        <div className="flex gap-4 items-center">
          <Link
            className="hover:text-pink"
            href="https://github.com/averyhere/sudoku"
            target="_blank"
          >
            <Github className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <form className="flex gap-2 my-2" action={handleAddPlayer}>
        <div className="flex flex-col">
          <label htmlFor="newPlayerName" className="text-xs">
            Player Name
          </label>
          <input
            type="text"
            required={true}
            className="border border-purple px-3 py-2 w-50 disabled:opacity-50"
            placeholder="Add a player"
            name="newPlayerName"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="defaultPoints" className="text-xs text-center">
            Initial Points
          </label>
          <input
            type="number"
            inputMode="numeric"
            required={true}
            defaultValue={defaultPoints}
            name="defaultPoints"
            className="border border-purple px-3 py-2 w-20 disabled:opacity-50"
            placeholder="Staring Points"
            onChange={(e) => setDefaultPoints(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs">&nbsp;</span>
          <Button type="submit">Add</Button>
        </div>
      </form>

      <div className="w-full mx-auto py-4 flex gap-2 pt-0 justify-center md:justify-start items-center md:hidden">
        <Button variant="secondary" size="xs" onClick={newGame}>
          New Game / Reset
        </Button>
      </div>
    </header>
  );
}
