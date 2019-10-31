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
export const countCellsInRow = (countingMethod: CountingMethod) => (
  prevRowCellCt: number,
  row: boolean[]
): number => row.reduce(countingMethod, prevRowCellCt);

/**
 * Counts the cells in the grid using the given countingMethod
 */
export const countCells = (
  grid: boolean[][],
  countingMethod: CountingMethod
): number => {
  return grid.reduce(countCellsInRow(countingMethod), 0);
};
