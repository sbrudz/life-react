import { renderHook, act } from "@testing-library/react-hooks";
import useGame from "./use-game";
import { countCells, deadCellCounter, liveCellCounter } from "./game-utils";
import { resizeGrid, toggleCell } from "./game-ducks";

describe("the useGame hook", () => {
  describe("on initialization", () => {
    it("provides a size that matches the initialSize", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      expect(result.current.size).toEqual(initialSize);
    });

    it("creates a 2D grid that has rows and columns that match initialSize", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      expect(result.current.grid.length).toEqual(initialSize);
      expect(result.current.grid[0].length).toEqual(initialSize);
    });

    it("creates a 2D grid with all dead cells", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      const deadCellCount = countCells(result.current.grid, deadCellCounter);
      const liveCellCount = countCells(result.current.grid, liveCellCounter);

      expect(deadCellCount).toEqual(initialSize * initialSize);
      expect(liveCellCount).toEqual(0);
    });
  });

  describe("when a resizeGrid action is dispatched", () => {
    it("updates the size property", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      const newSize = 12;
      act(() => {
        result.current.dispatch(resizeGrid(newSize));
      });

      expect(result.current.size).toEqual(newSize);
    });

    it("updates the size of the grid", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      const newSize = 12;
      act(() => {
        result.current.dispatch(resizeGrid(newSize));
      });

      expect(result.current.grid.length).toEqual(newSize);
      expect(result.current.grid[0].length).toEqual(newSize);
    });
  });

  describe("when toggleCell action is dispatched", () => {
    it("toggles the cell that was clicked", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      const clickLocation = { row: 3, column: 4 };
      act(() => {
        result.current.dispatch(toggleCell(clickLocation));
      });

      expect(
        result.current.grid[clickLocation.row][clickLocation.column]
      ).toBeTruthy();
    });

    it("only changes the cell that was clicked", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      const clickLocation = { row: 3, column: 4 };
      act(() => {
        result.current.dispatch(toggleCell(clickLocation));
      });

      const deadCellCount = countCells(result.current.grid, deadCellCounter);
      const liveCellCount = countCells(result.current.grid, liveCellCounter);

      expect(liveCellCount).toEqual(1);
      expect(deadCellCount).toEqual(initialSize * initialSize - 1);
    });

    it("reverts the cell back on a double click", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      const clickLocation = { row: 3, column: 4 };
      act(() => {
        result.current.dispatch(toggleCell(clickLocation));
      });
      act(() => {
        result.current.dispatch(toggleCell(clickLocation));
      });

      expect(
        result.current.grid[clickLocation.row][clickLocation.column]
      ).toBeFalsy();
    });
  });
});
