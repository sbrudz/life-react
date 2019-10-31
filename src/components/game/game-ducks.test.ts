import reducer, {
  initGameState,
  toggleCell,
  resizeGrid,
  evolveNextGeneration
} from "./game-ducks";
import {
  countCells,
  deadCellCounter,
  liveCellCounter
} from "./game-test-utils";

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
