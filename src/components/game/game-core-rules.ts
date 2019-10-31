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
    [me.row - 1, me.row, me.row + 1].includes(them.row) &&
    [me.column - 1, me.column, me.column + 1].includes(them.column)
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
  grid.forEach((row, rowIdx) => {
    row.forEach((cell, columnIdx) => {
      const isQueryCellAlive = grid[rowIdx][columnIdx];
      if (
        isQueryCellAlive &&
        isNeighbor(target, { row: rowIdx, column: columnIdx })
      ) {
        liveNeighborCount += 1;
      }
    });
  });
  return liveNeighborCount;
};
