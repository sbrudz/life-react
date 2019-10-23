import React from "react";
import styles from "./Grid.module.css";

type CellLocation = {
  row: number;
  column: number;
};

type GridProps = {
  grid: boolean[][];
  onClick: (args: CellLocation) => void;
};

const Grid = ({ grid, onClick }: GridProps) => {
  const body = grid.map((row, rowIdx) => {
    const children = row.map((cellVal, colIdx) => (
      <td
        key={`cell-${rowIdx}-${colIdx}`}
        onClick={() => onClick({ row: rowIdx, column: colIdx })}
      >
        {cellVal ? 1 : 0}
      </td>
    ));
    return <tr key={`row-${rowIdx}`}>{children}</tr>;
  });

  return (
    <table title="Grid" className={styles.table}>
      <tbody>{body}</tbody>
    </table>
  );
};

export default Grid;
