import React from "react";
import styles from "./grid.module.css";
import { CellLocation } from "../game-shared-types";

type GridProps = {
  grid: boolean[][];
  onClick: (location: CellLocation) => void;
};

const Grid = ({ grid, onClick }: GridProps) => {
  const height = 100 / grid.length;
  let currY = 0;
  const body = grid.map((row, rowIdx) => {
    const width = 100 / row.length;
    let currX = 0;
    const rowOfCells = row.map((cellVal, colIdx) => {
      const cellId = `cell-${rowIdx}-${colIdx}`;
      const cell = (
        <rect
          key={cellId}
          height={`${height}%`}
          width={`${width}%`}
          x={`${currX}%`}
          y={`${currY}%`}
          data-testid={cellId}
          className={cellVal ? styles.live : styles.dead}
          onClick={() => onClick({ row: rowIdx, column: colIdx })}
        />
      );
      currX += width;
      return cell;
    });
    currY += height;
    return rowOfCells;
  });

  return (
    <svg data-testid="Grid" className={styles.table}>
      {body}
    </svg>
  );
};

export default Grid;
