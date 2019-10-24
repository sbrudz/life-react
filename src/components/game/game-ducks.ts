import { CellLocation } from "./game-shared-types";

type GameState = {
  grid: boolean[][];
};

const TOGGLE_CELL = "TOGGLE_CELL";
const RESIZE_GRID = "RESIZE_GRID";

type ToggleCellAction = {
  type: typeof TOGGLE_CELL;
  payload: {
    cellLocation: CellLocation;
  };
};

type ResizeGridAction = {
  type: typeof RESIZE_GRID;
  payload: {
    newSize: number;
  };
};

type GameActionTypes = ToggleCellAction | ResizeGridAction;

export const toggleCell = (cellLocation: CellLocation): GameActionTypes => {
  return {
    type: TOGGLE_CELL,
    payload: {
      cellLocation
    }
  };
};

export const resizeGrid = (newSize: number): GameActionTypes => {
  return {
    type: RESIZE_GRID,
    payload: {
      newSize
    }
  };
};

export const initGameState = (size: number) => {
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
    case "TOGGLE_CELL":
      const newState = { ...state };
      const cellLocation = action.payload.cellLocation;
      const cell = newState.grid[cellLocation.row][cellLocation.column];
      newState.grid[cellLocation.row][cellLocation.column] = !cell;
      return newState;
    case "RESIZE_GRID":
      return initGameState(action.payload.newSize);
    default:
      throw new Error("Unrecognized action type");
  }
};

export default reducer;
