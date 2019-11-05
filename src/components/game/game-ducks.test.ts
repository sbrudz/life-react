import reducer, {
  initGameState,
  toggleCell,
  resizeGrid,
  evolveNextGeneration,
  startGame,
  stopGame
} from "./game-ducks";
import { countCells, deadCellCounter, liveCellCounter } from "./game-utils";

describe("game-ducks", () => {
  describe("reducer", () => {
    describe("for the toggleCell action", () => {
      it("toggles the state of the given cell", () => {
        const initialState = initGameState(5);
        const cellLocation = { row: 1, column: 2 };
        const action = toggleCell(cellLocation);

        const newState = reducer(initialState, action);

        expect(newState.grid[1][2]).toBeTruthy();
      });
    });

    describe("for the resizeGrid action", () => {
      it("Changes the size of the grid to match the new size", () => {
        const initialSize = 5;
        const newSize = 12;
        const initialState = initGameState(initialSize);
        const action = resizeGrid(newSize);

        const newState = reducer(initialState, action);

        expect(newState.grid.length).toEqual(newSize);
        expect(newState.grid[0].length).toEqual(newSize);
      });
    });

    describe("for the evolveNextGeneration action", () => {
      describe("with an all dead grid", () => {
        it("creates an all dead generation", () => {
          const initialSize = 3;
          const startingState = initGameState(initialSize);
          const evolveAction = evolveNextGeneration();

          const newState = reducer(startingState, evolveAction);

          const deadCellCount = countCells(newState.grid, deadCellCounter);
          const liveCellCount = countCells(newState.grid, liveCellCounter);
          expect(deadCellCount).toEqual(initialSize * initialSize);
          expect(liveCellCount).toEqual(0);
        });
      });

      describe("with a single live cell", () => {
        it("creates an all dead generation", () => {
          const initialSize = 3;
          const initialState = initGameState(initialSize);
          const startingState = reducer(
            initialState,
            toggleCell({ row: 1, column: 1 })
          );

          const evolveAction = evolveNextGeneration();
          const newState = reducer(startingState, evolveAction);

          const deadCellCount = countCells(newState.grid, deadCellCounter);
          const liveCellCount = countCells(newState.grid, liveCellCounter);
          expect(deadCellCount).toEqual(initialSize * initialSize);
          expect(liveCellCount).toEqual(0);
        });
      });

      describe("with two adjacent live cells", () => {
        it("creates an all dead generation", () => {
          const initialSize = 5;
          const initialState = initGameState(initialSize);
          const nextState = reducer(
            initialState,
            toggleCell({ row: 1, column: 2 })
          );
          const startingState = reducer(
            nextState,
            toggleCell({ row: 1, column: 1 })
          );

          const evolveAction = evolveNextGeneration();
          const newState = reducer(startingState, evolveAction);

          const deadCellCount = countCells(newState.grid, deadCellCounter);
          const liveCellCount = countCells(newState.grid, liveCellCounter);
          expect(deadCellCount).toEqual(initialSize * initialSize);
          expect(liveCellCount).toEqual(0);
        });
      });

      describe("with three adjacent live cells", () => {
        it("creates a generation where those cells live on and a new cell is born", () => {
          const initialSize = 5;
          const initialState = initGameState(initialSize);
          const nextState1 = reducer(
            initialState,
            toggleCell({ row: 1, column: 1 })
          );
          const nextState2 = reducer(
            nextState1,
            toggleCell({ row: 1, column: 2 })
          );
          const startingState = reducer(
            nextState2,
            toggleCell({ row: 2, column: 1 })
          );

          const evolveAction = evolveNextGeneration();
          const newState = reducer(startingState, evolveAction);

          expect(newState.grid[1][1]).toBeTruthy();
          expect(newState.grid[1][2]).toBeTruthy();
          expect(newState.grid[2][1]).toBeTruthy();
          expect(newState.grid[2][2]).toBeTruthy();

          const deadCellCount = countCells(newState.grid, deadCellCounter);
          const liveCellCount = countCells(newState.grid, liveCellCounter);
          expect(deadCellCount).toEqual(initialSize * initialSize - 4);
          expect(liveCellCount).toEqual(4);
        });
      });
    });

    describe("for the startGame action", () => {
      it("sets running state to true", () => {
        const size = 5;
        const initialState = initGameState(size);
        const action = startGame();

        const newState = reducer(initialState, action);
        expect(newState.grid).toEqual(initialState.grid);
        expect(newState.running).toBeTruthy();
      });
    });

    describe("for the stopGame action", () => {
      it("sets running state to false", () => {
        const size = 5;
        const initialState = initGameState(size);
        const runningState = { ...initialState, running: true };
        const action = stopGame();

        const newState = reducer(runningState, action);
        expect(newState.grid).toEqual(runningState.grid);
        expect(newState.running).toBeFalsy();
      });
    });

    describe("for an unknown action", () => {
      it("throws an error", () => {
        const initialState = initGameState(5);
        const action = { type: "UNKNOWN", payload: { newSize: 0 } } as any;

        expect(() => reducer(initialState, action)).toThrow(
          "Unrecognized action type"
        );
      });
    });
  });

  describe("initGameState", () => {
    it("creates a square grid with the specified size", () => {
      const inputSize = 5;
      const { grid } = initGameState(inputSize);

      expect(grid.length).toEqual(inputSize);
      expect(grid[0].length).toEqual(inputSize);
    });

    it("initializes the grid to have a value of false for all cells", () => {
      const inputSize = 2;
      const { grid } = initGameState(inputSize);

      expect(grid[0][0]).toBeFalsy();
      expect(grid[0][1]).toBeFalsy();
      expect(grid[1][0]).toBeFalsy();
      expect(grid[1][1]).toBeFalsy();
    });

    it("initializes the state so the game is not running", () => {
      const inputSize = 2;
      const { running } = initGameState(inputSize);
      expect(running).toBeFalsy();
    });

    it("throws an error if size is less than 1", () => {
      const inputSize = 0;
      expect(() => initGameState(inputSize)).toThrow(
        RangeError("The size must be greater than 0")
      );
    });

    it("creates a grid with a single cell if size is 1", () => {
      const inputSize = 1;
      const { grid } = initGameState(inputSize);

      expect(grid.length).toEqual(inputSize);
      expect(grid[0].length).toEqual(inputSize);
      expect(grid[0][0]).toBeFalsy();
    });
  });
});
