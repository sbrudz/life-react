import React, { useState, useMemo } from "react";
import "./game.css";
import Grid from "./grid";

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
      <Grid grid={grid} />
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

export default Game;
