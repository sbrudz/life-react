import { CellLocation } from "./game-shared-types";

export const shouldLive = (
  currentGrid: boolean[][],
  rowIdx: number,
  colIdx: number
) => {
  const targetCellLiving = currentGrid[rowIdx][colIdx];
  const liveNeighborCount = getLiveNeighborCount(currentGrid, {
    row: rowIdx,
    column: colIdx
  });

  if (targetCellLiving && (liveNeighborCount < 2 || liveNeighborCount > 3)) {
    return false;
  }
  if (!targetCellLiving && liveNeighborCount !== 3) {
    return false;
  }
  return true;
};

export const isNeighbor = (me: CellLocation, them: CellLocation) => {
  if (me.row === them.row && me.column === them.column) {
    return false;
  }

  if (
    (them.row === me.row - 1 ||
      them.row === me.row ||
      them.row === me.row + 1) &&
    (them.column === me.column - 1 ||
      them.column === me.column ||
      them.column === me.column + 1)
  ) {
    return true;
  }
  return false;
};

const getLiveNeighborCount = (
  grid: boolean[][],
  target: CellLocation
): number => {
  let liveNeighborCount = 0;
  const cellToCheck = { row: 0, column: 0 };
  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    for (let columnIdx = 0; columnIdx < grid[rowIdx].length; columnIdx++) {
      cellToCheck.row = rowIdx;
      cellToCheck.column = columnIdx;
      if (
        grid[rowIdx][columnIdx] && // if cellToCheck is alive
        isNeighbor(target, cellToCheck)
      ) {
        liveNeighborCount += 1;
      }
    }
  }
  return liveNeighborCount;
};
