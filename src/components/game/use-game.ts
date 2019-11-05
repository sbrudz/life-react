import { useReducer, useEffect } from "react";
import reducer, { evolveNextGeneration, initGameState } from "./game-ducks";
import { countCells, liveCellCounter } from "./game-utils";

const useGame = (initialSize: number) => {
  const [gameState, dispatch] = useReducer(reducer, initialSize, initGameState);
  const { grid, running } = gameState;
  const size = grid.length;
  const liveCellCount = countCells(grid, liveCellCounter);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (running) {
      timerId = setInterval(() => {
        dispatch(evolveNextGeneration());
      }, 100);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [running, dispatch]);

  return { size, grid, running, liveCellCount, dispatch };
};

export default useGame;
