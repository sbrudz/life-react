import { useReducer, useEffect } from "react";
import reducer, { evolveNextGeneration, initGameState } from "./game-ducks";

const useGame = (initialSize: number) => {
  const [gameState, dispatch] = useReducer(reducer, initialSize, initGameState);
  const { grid, running } = gameState;
  const size = grid.length;

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

  return { size, grid, running, dispatch };
};

export default useGame;
