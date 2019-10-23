import React from "react";
import styles from "./Grid.module.css";

interface GridProps {
  grid: boolean[][];
}

const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <table title="Grid" className={styles.table}>
      <tbody>{buildCells(grid)}</tbody>
    </table>
  );
};

const buildCells = (grid: boolean[][]) => {
  return grid.map((row, rowIdx) => {
    const children = row.map((cellVal, colIdx) => (
      <td key={`cell-${rowIdx}-${colIdx}`}>{cellVal ? 1 : 0}</td>
    ));
    return <tr key={`row-${rowIdx}`}>{children}</tr>;
  });
};

export default Grid;
