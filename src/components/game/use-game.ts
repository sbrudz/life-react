import { useState, useMemo } from "react";

const useGame = (initialSize: number) => {
  const [size, setSize] = useState(initialSize);

  const grid = useMemo(() => {
    const rows = new Array(size);
    const defaultRow: boolean[] = new Array(size);
    defaultRow.fill(false);
    rows.fill(defaultRow);
    return rows;
  }, [size]);

  const handleCellClick = () => {};

  return { size, setSize, grid, handleCellClick };
};

export default useGame;
