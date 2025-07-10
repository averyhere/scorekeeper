"use client";

import { cn } from "@/lib/utils";

import {
  usePointTrackerStore,
  type Player,
} from "@/hooks/usePointTrackerStore";
import { Button } from "@/components/ui/button";

export function PointTracker() {
  const { scoreboard, removePlayer, pointer, setPointer, incrementPoints } =
    usePointTrackerStore();

  const handleAddPoints = (formData: FormData) => {
    const points = formData.get("addPoints") as string;

    incrementPoints(pointer!, Number(points), "add");
  };

  const handleSubtractPoints = (formData: FormData) => {
    const points = formData.get("subPoints") as string;

    incrementPoints(pointer!, Number(points), "subtract");
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {scoreboard.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 items-center justify-center">
          {scoreboard.map((player: Player, index: number) => (
            <div
              key={player.name}
              onClick={() => setPointer(index)}
              className={cn([
                "grid grid-cols-1 gap-3 cursor-pointer border border-purple p-2 md:p-4",
                pointer === index ? "outline-2" : "outline-none",
              ])}
            >
              <h3 className="text-2xl font-bold text-center">{player.name}</h3>

              <div className="text-4xl text-center">{player.points}</div>

              {/* <div> */}
              <Button
                variant="link"
                onClick={removePlayer}
                disabled={pointer !== index}
              >
                Remove
              </Button>
              {/* </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div>Add players to begin!</div>
      )}

      <div className="w-full max-w-sm flex flex-col gap-3 ">
        <div className="flex w-full gap-3 items-center justify-center">
          <div className="w-max grid grid-cols-4 gap-3">
            <Button
              size="num"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
              onClick={() => incrementPoints(pointer!, 1, "add")}
            >
              +1
            </Button>
            <Button
              size="num"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
              onClick={() => incrementPoints(pointer!, 5, "add")}
            >
              +5
            </Button>
            <Button
              size="num"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
              onClick={() => incrementPoints(pointer!, 10, "add")}
            >
              +10
            </Button>
            <Button
              size="num"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
              onClick={() => incrementPoints(pointer!, 15, "add")}
            >
              +15
            </Button>
          </div>
          <div className="h-full w-px bg-purple">&zwnj;</div>
          <form action={handleAddPoints} className="w-max  flex gap-3">
            <input
              type="number"
              inputMode="numeric"
              name="addPoints"
              className="border border-purple px-3 py-2 w-20 disabled:opacity-50"
              disabled={typeof pointer === "undefined"}
            />
            <Button
              type="submit"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
            >
              +
            </Button>
          </form>
        </div>
        <div className="flex w-full gap-3 items-center justify-center">
          <div className="w-max grid grid-cols-4 gap-3">
            <Button
              size="num"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
              onClick={() => incrementPoints(pointer!, 1, "subtract")}
            >
              -1
            </Button>
            <Button
              size="num"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
              onClick={() => incrementPoints(pointer!, 5, "subtract")}
            >
              -5
            </Button>
            <Button
              size="num"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
              onClick={() => incrementPoints(pointer!, 10, "subtract")}
            >
              -10
            </Button>
            <Button
              size="num"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
              onClick={() => incrementPoints(pointer!, 15, "subtract")}
            >
              -15
            </Button>
          </div>
          <div className="h-full w-px bg-purple">&zwnj;</div>
          <form action={handleSubtractPoints} className="w-max  flex gap-3">
            <input
              type="number"
              inputMode="numeric"
              name="subtract"
              className="border border-purple px-3 py-2 w-20 disabled:opacity-50"
              disabled={typeof pointer === "undefined"}
            />
            <Button
              type="submit"
              className="w-10 h-10"
              disabled={typeof pointer === "undefined"}
            >
              -
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
