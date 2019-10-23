import React, { useState, useMemo } from "react";
import styles from "./game.module.css";
import Grid from "./grid";

const Game = () => {
  const [size, setSize] = useState(20);
  const grid = useMemo(() => {
    const rows = new Array(size);
    const defaultRow: boolean[] = new Array(size);
    defaultRow.fill(false);
    rows.fill(defaultRow);
    return rows;
  }, [size]);

  // TODO: use an action & reducer for this
  const handleClick = () => {};

  return (
    <section className={styles.gameSection}>
      <h2>Game</h2>
      <Grid grid={grid} onClick={handleClick} />
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

/*
test that the grid shows its state appropriately (how?)
clicking a cell in the grid toggles its state
clicking the step button applies the rules of life to the current grid state to generate a new grid state
 */

export default Game;
