import React, { Dispatch } from "react";
import {
  GameActionTypes,
  clearGame,
  evolveNextGeneration,
  startGame,
  stopGame
} from "./game-ducks";

type GameButtonPanelProps = {
  running: boolean;
  liveCellCount: number;
  dispatch: Dispatch<GameActionTypes>;
};

const GameButtonPanel = ({
  running,
  dispatch,
  liveCellCount
}: GameButtonPanelProps) => {
  return (
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
      <button
        disabled={liveCellCount === 0}
        onClick={() => dispatch(clearGame())}
      >
        Clear
      </button>
    </div>
  );
};

export default GameButtonPanel;
