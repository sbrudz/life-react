import { useReducer, useMemo } from "react";
import reducer, { initGameState } from "./game-ducks";
import { decodeGridState, encodeGridState } from "./game-utils";

const useGame = (gridCode?: string) => {
  let initialState = initGameState(20);
  try {
    if (gridCode) {
      initialState = {
        grid: decodeGridState(gridCode),
        initCode: gridCode
      };
    }
  } catch (e) {
    console.error(e.message);
  }
  const [gameState, dispatch] = useReducer(reducer, initialState);

  const size = useMemo(() => {
    return gameState.grid.length;
  }, [gameState]);

  return { size, grid: gameState.grid, initCode: gameState.initCode, dispatch };
};

export default useGame;
