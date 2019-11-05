import React from "react";
import styles from "./game.module.css";
import Grid from "./grid";
import useGame from "./use-game";
import { resizeGrid, toggleCell } from "./game-ducks";
import Rules from "../rules";
import GameButtonPanel from "./game-button-panel";

const Game = () => {
  const { size, grid, running, liveCellCount, dispatch } = useGame(20);

  return (
    <section className={styles.section}>
      <h2>Game</h2>
      <Grid
        grid={grid}
        onClick={cellLocation => dispatch(toggleCell(cellLocation))}
      />
      <section className={styles.side}>
        <p>
          Click cells on the grid to create a starting pattern. Then click Play
          to start the game.
        </p>
        <GameButtonPanel
          running={running}
          liveCellCount={liveCellCount}
          dispatch={dispatch}
        />
        <fieldset>
          <label htmlFor="size">Grid Size</label>
          <input
            type="number"
            id="size"
            value={size}
            onChange={e => dispatch(resizeGrid(+e.target.value))}
          />
        </fieldset>
        <Rules />
      </section>
    </section>
  );
};

export default Game;
