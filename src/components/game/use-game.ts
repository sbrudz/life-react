import { useReducer, useMemo } from "react";
import reducer, { initGameState, toggleCell, resizeGrid } from "./game-ducks";

const useGame = (initialSize: number) => {
  const [state, dispatch] = useReducer(reducer, initialSize, initGameState);

  const handleCellClick = (cellLocation: { row: number; column: number }) => {
    dispatch(toggleCell(cellLocation));
  };

  const setSize = (newSize: number) => {
    dispatch(resizeGrid(newSize));
  };

  const size = useMemo(() => {
    return state.grid.length;
  }, [state]);

  return { size, setSize, grid: state.grid, handleCellClick };
};

export default useGame;
