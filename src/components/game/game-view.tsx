import React from "react";
import styles from "./game.module.css";
import Grid from "./grid";
import useGame from "./use-game";
import {
  evolveNextGeneration,
  resizeGrid,
  startGame,
  stopGame,
  toggleCell
} from "./game-ducks";
import Rules from "../rules";

const Game = () => {
  const { size, grid, running, dispatch } = useGame(20);

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
        <div className="btn-grp">
          <button disabled={running} onClick={() => dispatch(startGame())}>
            Play
          </button>
          <button disabled={!running} onClick={() => dispatch(stopGame())}>
            Stop
          </button>
          <button
            disabled={running}
            onClick={() => dispatch(evolveNextGeneration())}
          >
            Step
          </button>
        </div>
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
