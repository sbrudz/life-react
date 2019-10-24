import { renderHook, act } from "@testing-library/react-hooks";
import useGame from "./use-game";

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

      const deadCellCount = result.current.grid.reduce(
        (deadCellCtAcc: number, row: boolean[]) => {
          return row.reduce(
            (rowCt: number, cell: boolean) => (cell ? rowCt : rowCt + 1),
            deadCellCtAcc
          );
        },
        0
      );
      expect(deadCellCount).toEqual(initialSize * initialSize);
    });
  });

  describe("when setSize is called", () => {
    it("updates the size property", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      const newSize = 12;
      act(() => {
        result.current.setSize(newSize);
      });

      expect(result.current.size).toEqual(newSize);
    });

    it("updates the size of the grid", () => {
      const initialSize = 8;
      const { result } = renderHook(() => useGame(initialSize));

      const newSize = 12;
      act(() => {
        result.current.setSize(newSize);
      });

      expect(result.current.grid.length).toEqual(newSize);
      expect(result.current.grid[0].length).toEqual(newSize);
    });
  });
});
