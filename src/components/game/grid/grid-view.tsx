import React from "react";
import styles from "./grid.module.css";
import { CellLocation } from "../game-shared-types";

type GridProps = {
  grid: boolean[][];
  onClick: (location: CellLocation) => void;
};

const Grid = ({ grid, onClick }: GridProps) => {
  const body = grid.map((row, rowIdx) => {
    const children = row.map((cellVal, colIdx) => {
      const cellId = `cell-${rowIdx}-${colIdx}`;
      return (
        <td
          key={cellId}
          data-testid={cellId}
          className={cellVal ? styles.live : styles.dead}
          onClick={() => onClick({ row: rowIdx, column: colIdx })}
        >
          {cellVal ? 1 : 0}
        </td>
      );
    });
    return <tr key={`row-${rowIdx}`}>{children}</tr>;
  });

  return (
    <table title="Grid" data-testid="Grid" className={styles.table}>
      <tbody>{body}</tbody>
    </table>
  );
};

export default Grid;
