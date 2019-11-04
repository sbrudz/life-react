import {
  countCells,
  deadCellCounter,
  decodeGridState,
  encodeGridState,
  liveCellCounter,
  ERROR_MESSAGES
} from "./game-utils";

describe("Game utility functions", () => {
  describe("deadCellCounter", () => {
    describe("when the input cell is dead", () => {
      it("adds 1 to the counter", () => {
        const rowCt = 2;
        const cellState = false;
        const result = deadCellCounter(rowCt, cellState);
        expect(result).toEqual(3);
      });
    });

    describe("when the input cell is alive", () => {
      it("adds 0 to the counter", () => {
        const rowCt = 2;
        const cellState = true;
        const result = deadCellCounter(rowCt, cellState);
        expect(result).toEqual(rowCt);
      });
    });
  });

  describe("liveCellCounter", () => {
    describe("when the input cell is dead", () => {
      it("adds 0 to the counter", () => {
        const rowCt = 2;
        const cellState = false;
        const result = liveCellCounter(rowCt, cellState);
        expect(result).toEqual(rowCt);
      });
    });

    describe("when the input cell is alive", () => {
      it("adds 1 to the counter", () => {
        const rowCt = 2;
        const cellState = true;
        const result = liveCellCounter(rowCt, cellState);
        expect(result).toEqual(3);
      });
    });
  });

  describe("countCells", () => {
    describe("when given a grid and a counting method", () => {
      it("counts all the cells in the grid using that method", () => {
        const grid = [
          [false, false, false],
          [false, true, true],
          [false, false, false]
        ];
        const result = countCells(grid, liveCellCounter);
        expect(result).toEqual(2);
      });
    });

    describe("when given a grid and a different counting method", () => {
      it("counts all the cells in the grid using that method", () => {
        const grid = [
          [false, false, false],
          [false, true, true],
          [false, false, false]
        ];
        const result = countCells(grid, deadCellCounter);
        expect(result).toEqual(7);
      });
    });
  });

  describe("encodeGridState", () => {
    describe("when given a grid", () => {
      it("encodes the grid's state as a bitfield", () => {
        const grid = [
          [false, false, false],
          [false, true, true],
          [false, false, false]
        ];

        const result = encodeGridState(grid);

        expect(result).toEqual("IwBjOUyA");
      });
    });

    describe("when given a single cell grid", () => {
      it("encodes the grid's state as a bitfield", () => {
        const grid = [[false]];

        const result = encodeGridState(grid);

        expect(result).toEqual("IwBiA");
      });
    });

    describe("when given a null grid", () => {
      it("throws an error", () => {
        const grid = null as any;
        expect(() => encodeGridState(grid)).toThrowError(
          ERROR_MESSAGES.INVALID_GRID_ERROR
        );
      });
    });

    describe("when given a grid with no cells", () => {
      it("throws an error", () => {
        const grid = [[]] as any;
        expect(() => encodeGridState(grid)).toThrowError(
          ERROR_MESSAGES.INVALID_GRID_ERROR
        );
      });
    });

    describe("when given a grid with no rows", () => {
      it("throws an error", () => {
        const grid = [] as any;
        expect(() => encodeGridState(grid)).toThrowError(
          ERROR_MESSAGES.INVALID_GRID_ERROR
        );
      });
    });
  });

  describe("decodeGridState", () => {
    describe("when given an encoded bitfield", () => {
      it("decodes the bitfield into the grid state", () => {
        const bitfield = "IwBjOUyA";

        const result = decodeGridState(bitfield);

        const grid = [
          [false, false, false],
          [false, true, true],
          [false, false, false]
        ];
        expect(result).toEqual(grid);
      });
    });

    describe("when given an encoded bitfield for a single cell grid", () => {
      it("decodes the bitfield into the grid state", () => {
        const bitfield = "IwBiA";

        const result = decodeGridState(bitfield);

        const grid = [[false]];
        expect(result).toEqual(grid);
      });
    });

    describe("when given a null bitfield", () => {
      it("throws an error", () => {
        const bitfield = null as any;
        expect(() => decodeGridState(bitfield)).toThrowError(
          ERROR_MESSAGES.EMPTY_BITFIELD_ERROR
        );
      });
    });

    describe("when given a bitfield for a grid with no cells", () => {
      it("throws an error", () => {
        const bitfield = "1";
        expect(() => decodeGridState(bitfield)).toThrowError(
          ERROR_MESSAGES.INVALID_BITFIELD_ERROR
        );
      });
    });

    describe("when given a bitfield that can't be decompressed", () => {
      it("throws an error", () => {
        const bitfield = "2";
        expect(() => decodeGridState(bitfield)).toThrowError(
          ERROR_MESSAGES.INVALID_BITFIELD_ERROR
        );
      });
    });

    describe("when given an invalid bitfield", () => {
      it("throws an error", () => {
        const bitfield = "hello";
        expect(() => decodeGridState(bitfield)).toThrowError(
          ERROR_MESSAGES.INVALID_BITFIELD_ERROR
        );
      });
    });
  });
});
