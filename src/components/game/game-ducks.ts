import { CellLocation } from "./game-shared-types";
import { shouldLive } from "./game-core-rules";

type GameState = {
  grid: boolean[][];
  running: boolean;
};

const TOGGLE_CELL = "TOGGLE_CELL";
const RESIZE_GRID = "RESIZE_GRID";
const EVOLVE_NEXT_GENERATION = "EVOLVE_NEXT_GENERATION";
const START_GAME = "START_GAME";
const STOP_GAME = "STOP_GAME";

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

type EvolveNextGenerationAction = {
  type: typeof EVOLVE_NEXT_GENERATION;
  payload: {};
};

type StartGameAction = {
  type: typeof START_GAME;
  payload: {};
};

type StopGameAction = {
  type: typeof STOP_GAME;
  payload: {};
};

type GameActionTypes =
  | ToggleCellAction
  | ResizeGridAction
  | EvolveNextGenerationAction
  | StartGameAction
  | StopGameAction;

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

export const evolveNextGeneration = (): GameActionTypes => {
  return {
    type: EVOLVE_NEXT_GENERATION,
    payload: {}
  };
};

export const startGame = (): GameActionTypes => {
  return {
    type: START_GAME,
    payload: {}
  };
};

export const stopGame = (): GameActionTypes => {
  return {
    type: STOP_GAME,
    payload: {}
  };
};

export const initGameState = (size: number) => {
  if (size <= 0) {
    throw new RangeError("The size must be greater than 0");
  }
  const grid = [];
  for (let rowIdx = 0; rowIdx < size; rowIdx++) {
    const row = [];
    for (let colIdx = 0; colIdx < size; colIdx++) {
      row.push(false);
    }
    grid.push(row);
  }
  return { grid, running: false };
};

const nextGeneration = (currentGrid: boolean[][]) => {
  const newGrid = [];
  for (let rowIdx = 0; rowIdx < currentGrid.length; rowIdx++) {
    const row = [];
    for (let colIdx = 0; colIdx < currentGrid[rowIdx].length; colIdx++) {
      const newCellState = shouldLive(currentGrid, rowIdx, colIdx);
      row.push(newCellState);
    }
    newGrid.push(row);
  }
  return newGrid;
};

const reducer = (state: GameState, action: GameActionTypes): GameState => {
  switch (action.type) {
    case TOGGLE_CELL:
      const newState = { ...state };
      const cellLocation = action.payload.cellLocation;
      const cell = newState.grid[cellLocation.row][cellLocation.column];
      newState.grid[cellLocation.row][cellLocation.column] = !cell;
      return newState;
    case RESIZE_GRID:
      return initGameState(action.payload.newSize);
    case EVOLVE_NEXT_GENERATION:
      return { grid: nextGeneration(state.grid), running: state.running };
    case START_GAME:
      return { ...state, running: true };
    case STOP_GAME:
      return { ...state, running: false };
    default:
      throw new Error("Unrecognized action type");
  }
};

export default reducer;
