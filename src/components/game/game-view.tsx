import React, { useState, useMemo } from "react";
import "./game.css";

const Game: React.FC = () => {
  const [size, setSize] = useState(20);
  const grid = useMemo(() => {
    const rows = new Array(size);
    const defaultRow: boolean[] = new Array(size);
    defaultRow.fill(false);
    rows.fill(defaultRow);
    return rows;
  }, [size]);

  return (
    <section className="Game-section">
      <h2>Game</h2>
      <table title="Grid">
        <tbody>{buildCells(grid)}</tbody>
      </table>
      <label htmlFor="size">Size</label>
      <input
        type="number"
        id="size"
        value={size}
        onChange={e => setSize(+e.target.value)}
      />
      <button>Step</button>
    </section>
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

export default Game;
