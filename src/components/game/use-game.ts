import { useReducer, useMemo } from "react";
import reducer, { initGameState } from "./game-ducks";

const useGame = (initialSize: number) => {
  const [gameState, dispatch] = useReducer(reducer, initialSize, initGameState);

  const size = useMemo(() => {
    return gameState.grid.length;
  }, [gameState]);

  return { size, grid: gameState.grid, running: gameState.running, dispatch };
};

export default useGame;
