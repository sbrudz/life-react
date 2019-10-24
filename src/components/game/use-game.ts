import { useReducer, useMemo } from "react";

type GameState = {
  grid: boolean[][];
};

const CLICK_CELL = "CLICK_CELL";
const RESIZE_GRID = "RESIZE_GRID";

type ClickCellAction = {
  type: typeof CLICK_CELL;
  payload: {
    clickLocation: { row: number; column: number };
  };
};

type ResizeGridAction = {
  type: typeof RESIZE_GRID;
  payload: {
    newSize: number;
  };
};

type GameActionTypes = ClickCellAction | ResizeGridAction;

const handleClickCell = (clickLocation: {
  row: number;
  column: number;
}): GameActionTypes => {
  return {
    type: CLICK_CELL,
    payload: {
      clickLocation
    }
  };
};

const resizeGrid = (newSize: number): GameActionTypes => {
  return {
    type: RESIZE_GRID,
    payload: {
      newSize
    }
  };
};

const init = (size: number) => {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(false);
    }
    grid.push(row);
  }
  return { grid };
};

const reducer = (state: GameState, action: GameActionTypes): GameState => {
  switch (action.type) {
    case "CLICK_CELL":
      const newState = { ...state };
      const clickLocation = action.payload.clickLocation;
      const cell = newState.grid[clickLocation.row][clickLocation.column];
      newState.grid[clickLocation.row][clickLocation.column] = !cell;
      return newState;
    case "RESIZE_GRID":
      return init(action.payload.newSize);
    default:
      throw new Error("Unrecognized action type");
  }
};

const useGame = (initialSize: number) => {
  const [state, dispatch] = useReducer(reducer, initialSize, init);

  const handleCellClick = (clickLocation: { row: number; column: number }) => {
    dispatch(handleClickCell(clickLocation));
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
