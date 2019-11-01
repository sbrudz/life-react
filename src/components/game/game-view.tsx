import React, { useState, useEffect } from "react";
import styles from "./game.module.css";
import Grid from "./grid";
import useGame from "./use-game";
import { evolveNextGeneration, resizeGrid, toggleCell } from "./game-ducks";
import Rules from "../rules";

const Game = () => {
  const { size, grid, dispatch } = useGame(20);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (running) {
      timerId = setInterval(() => {
        dispatch(evolveNextGeneration());
      }, 100);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [running]);

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
          <button disabled={running} onClick={() => setRunning(true)}>
            Play
          </button>
          <button disabled={!running} onClick={() => setRunning(false)}>
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
