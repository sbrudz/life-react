import React from "react";
import styles from "./game.module.css";
import Grid from "./grid";
import useGame from "./use-game";
import { evolveNextGeneration, resizeGrid, toggleCell } from "./game-ducks";

const Game = () => {
  const { size, grid, dispatch } = useGame(20);

  return (
    <section className={styles.gameSection}>
      <h2>Game</h2>
      <Grid
        grid={grid}
        onClick={cellLocation => dispatch(toggleCell(cellLocation))}
      />
      <label htmlFor="size">Size</label>
      <input
        type="number"
        id="size"
        value={size}
        onChange={e => dispatch(resizeGrid(+e.target.value))}
      />
      <button onClick={() => dispatch(evolveNextGeneration())}>Step</button>
    </section>
  );
};

export default Game;
