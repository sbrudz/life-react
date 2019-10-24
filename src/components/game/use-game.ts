import { useState, useMemo } from "react";

const useGame = (initialSize: number) => {
  const [size, setSize] = useState(initialSize);

  const grid = useMemo(() => {
    const rows = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(false);
      }
      rows.push(row);
    }
    return rows;
  }, [size]);

  const handleCellClick = (clickLocation: { row: number; column: number }) => {
    const cell = grid[clickLocation.row][clickLocation.column];
    grid[clickLocation.row][clickLocation.column] = !cell;
  };

  return { size, setSize, grid, handleCellClick };
};

export default useGame;
