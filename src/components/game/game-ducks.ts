import { CellLocation, ImmutableGrid } from "./game-shared-types";
import { shouldLive } from "./game-core-rules";
import { encodeGridState } from "./game-utils";

type GameState = {
  grid: ImmutableGrid;
  readonly running: boolean;
  readonly initCode: string;
};

const TOGGLE_CELL = "TOGGLE_CELL";
const RESIZE_GRID = "RESIZE_GRID";
const EVOLVE_NEXT_GENERATION = "EVOLVE_NEXT_GENERATION";
const START_GAME = "START_GAME";
const STOP_GAME = "STOP_GAME";
const CLEAR_GAME = "CLEAR_GAME";

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

type ClearGameAction = {
  type: typeof CLEAR_GAME;
  payload: {};
};

export type GameActionTypes =
  | ToggleCellAction
  | ResizeGridAction
  | EvolveNextGenerationAction
  | StartGameAction
  | StopGameAction
  | ClearGameAction;

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

export const clearGame = (): GameActionTypes => {
  return {
    type: CLEAR_GAME,
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
  const initCode = encodeGridState(grid);
  return { grid, running: false, initCode };
};

const nextGeneration = (currentGrid: ImmutableGrid) => {
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
      const newGrid = state.grid.map(row => row.slice());
      const { row, column } = action.payload.cellLocation;
      newGrid[row][column] = !state.grid[row][column];
      const initCode = encodeGridState(newGrid);
      return { ...state, grid: newGrid, initCode };
    case RESIZE_GRID:
      return initGameState(action.payload.newSize);
    case EVOLVE_NEXT_GENERATION:
      const grid = nextGeneration(state.grid);
      return { ...state, grid };
    case START_GAME:
      return { ...state, running: true };
    case STOP_GAME:
      return { ...state, running: false };
    case CLEAR_GAME:
      return initGameState(state.grid.length);
    default:
      throw new Error("Unrecognized action type");
  }
};

export default reducer;
