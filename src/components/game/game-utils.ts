import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent
} from "lz-string";
import { ImmutableGrid, ImmutableGridRow } from "./game-shared-types";

type CountingMethod = {
  (rowCt: number, cell: boolean): number;
};

/**
 * A counting method used by countAllCells to count the number of dead cells
 *
 * @param rowCt aggregate count of dead cells for the row
 * @param cell the cell being counted
 */
export const deadCellCounter: CountingMethod = (rowCt: number, cell: boolean) =>
  cell ? rowCt : rowCt + 1;

/**
 * A counting method used by countAllCells to count the number of living cells
 *
 * @param rowCt aggregate count of living cells for the row
 * @param cell the cell being counted
 */
export const liveCellCounter: CountingMethod = (rowCt: number, cell: boolean) =>
  !cell ? rowCt : rowCt + 1;

/**
 * Counts the number of cells in a row of a grid that fit the criteria defined by countingMethod
 *
 * @param countingMethod the function used to do the counting
 */
const countCellsInRow = (countingMethod: CountingMethod) => (
  prevRowCellCt: number,
  row: ImmutableGridRow
): number => row.reduce(countingMethod, prevRowCellCt);

/**
 * Counts the cells in the grid using the given countingMethod
 */
export const countCells = (
  grid: ImmutableGrid,
  countingMethod: CountingMethod
): number => {
  return grid.reduce(countCellsInRow(countingMethod), 0);
};

export const ERROR_MESSAGES = {
  INVALID_GRID_ERROR: "Invalid grid. Unable to encode grid state.",
  EMPTY_BITFIELD_ERROR:
    "Bitfield cannot be empty. Unable to reconstruct grid state.",
  INVALID_BITFIELD_ERROR: "Invalid bitfield. Unable to reconstruct grid state."
};

export const encodeGridState = (grid: ImmutableGrid): string => {
  if (grid === null || grid.length === 0 || grid[0].length === 0) {
    throw new Error(ERROR_MESSAGES.INVALID_GRID_ERROR);
  }
  const cellCount = grid.length * grid.length;
  const base = new Array(cellCount + 1);
  base[0] = "1"; // first bit is always 1 so that empty grids are handled properly
  let index = 1;
  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    for (let columnIdx = 0; columnIdx < grid[rowIdx].length; columnIdx++) {
      base[index] = grid[rowIdx][columnIdx] ? "1" : "0";
      index++;
    }
  }
  const bitfield = base.join("");
  return compressToEncodedURIComponent(bitfield);
};

export const decodeGridState = (compressedBitfield: string): ImmutableGrid => {
  if (!compressedBitfield) {
    throw new Error(ERROR_MESSAGES.EMPTY_BITFIELD_ERROR);
  }
  const bitfield = decompressFromEncodedURIComponent(compressedBitfield);
  if (!bitfield) {
    throw new Error(ERROR_MESSAGES.INVALID_BITFIELD_ERROR);
  }
  const gridSize = Math.sqrt(bitfield.length - 1);
  if (!Number.isInteger(gridSize) || gridSize <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_BITFIELD_ERROR);
  }
  const grid: boolean[][] = new Array(gridSize);
  let index = 1;
  for (let rowIdx = 0; rowIdx < gridSize; rowIdx++) {
    const row = new Array(gridSize);
    for (let columnIdx = 0; columnIdx < gridSize; columnIdx++) {
      row[columnIdx] = bitfield[index] === "1" ? true : false;
      index++;
    }
    grid[rowIdx] = row;
  }
  return grid;
};
