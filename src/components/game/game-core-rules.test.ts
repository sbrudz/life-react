import { shouldLive, isNeighbor } from "./game-core-rules";

describe("Core rules of life", () => {
  describe("shouldLive", () => {
    describe("with a live cell with no live neighbors", () => {
      it("returns false", () => {
        const grid = [
          [false, false, false],
          [false, true, false],
          [false, false, false]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });

    describe("with a live cell with one live neighbor", () => {
      it("returns false", () => {
        const grid = [
          [false, false, false],
          [false, true, true],
          [false, false, false]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });

    describe("with a live cell with two live neighbors", () => {
      it("returns true", () => {
        const grid = [
          [false, false, false],
          [false, true, true],
          [false, true, false]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeTruthy();
      });
    });

    describe("with a live cell with three live neighbors", () => {
      it("returns true", () => {
        const grid = [
          [false, false, false],
          [false, true, true],
          [false, true, true]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeTruthy();
      });
    });

    describe("with a live cell with four live neighbors", () => {
      it("returns false", () => {
        const grid = [
          [false, false, true],
          [false, true, true],
          [false, true, true]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });

    describe("with a live cell with five live neighbors", () => {
      it("returns false", () => {
        const grid = [
          [false, true, true],
          [false, true, true],
          [false, true, true]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });

    describe("with a live cell with six live neighbors", () => {
      it("returns false", () => {
        const grid = [
          [true, true, true],
          [false, true, true],
          [false, true, true]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });

    describe("with a live cell with seven live neighbors", () => {
      it("returns false", () => {
        const grid = [
          [true, true, true],
          [true, true, true],
          [false, true, true]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });

    describe("with a live cell with eight live neighbors", () => {
      it("returns false", () => {
        const grid = [
          [true, true, true],
          [true, true, true],
          [true, true, true]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });

    describe("with a dead cell with one live neighbor", () => {
      it("returns false", () => {
        const grid = [
          [false, false, false],
          [true, false, false],
          [false, false, false]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });

    describe("with a dead cell with two live neighbors", () => {
      it("returns false", () => {
        const grid = [
          [false, false, false],
          [true, false, false],
          [false, true, false]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });

    describe("with a dead cell with exactly three live neighbors", () => {
      it("returns true", () => {
        const grid = [
          [false, false, false],
          [true, false, true],
          [false, true, false]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeTruthy();
      });
    });

    describe("with a dead cell with more than three live neighbors", () => {
      it("returns false", () => {
        const grid = [
          [false, false, true],
          [true, false, true],
          [false, true, false]
        ];

        const result = shouldLive(grid, 1, 1);

        expect(result).toBeFalsy();
      });
    });
  });

  describe("isNeighbor", () => {
    describe("with a non-adjacent cell to the southwest", () => {
      it("returns false", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 3, column: 0 };

        const result = isNeighbor(me, them);

        expect(result).toBeFalsy();
      });
    });

    describe("with a non-adjacent cell to the southeast", () => {
      it("returns false", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 3, column: 3 };

        const result = isNeighbor(me, them);

        expect(result).toBeFalsy();
      });
    });

    describe("with a non-adjacent cell to the south", () => {
      it("returns false", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 3, column: 1 };

        const result = isNeighbor(me, them);

        expect(result).toBeFalsy();
      });
    });

    describe("with a non-adjacent cell to the north", () => {
      it("returns false", () => {
        const me = { row: 2, column: 2 };
        const them = { row: 0, column: 2 };

        const result = isNeighbor(me, them);

        expect(result).toBeFalsy();
      });
    });

    describe("with myself", () => {
      it("returns false", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 1, column: 1 };

        const result = isNeighbor(me, them);

        expect(result).toBeFalsy();
      });
    });

    describe("with an adjacent cell to the west", () => {
      it("returns true", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 1, column: 0 };

        const result = isNeighbor(me, them);

        expect(result).toBeTruthy();
      });
    });

    describe("with an adjacent cell to the east", () => {
      it("returns true", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 1, column: 2 };

        const result = isNeighbor(me, them);

        expect(result).toBeTruthy();
      });
    });

    describe("with an adjacent cell to the north", () => {
      it("returns true", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 0, column: 1 };

        const result = isNeighbor(me, them);

        expect(result).toBeTruthy();
      });
    });

    describe("with an adjacent cell to the northeast", () => {
      it("returns true", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 0, column: 2 };

        const result = isNeighbor(me, them);

        expect(result).toBeTruthy();
      });
    });

    describe("with an adjacent cell to the northwest", () => {
      it("returns true", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 0, column: 0 };

        const result = isNeighbor(me, them);

        expect(result).toBeTruthy();
      });
    });

    describe("with an adjacent cell to the south", () => {
      it("returns true", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 2, column: 1 };

        const result = isNeighbor(me, them);

        expect(result).toBeTruthy();
      });
    });

    describe("with an adjacent cell to the southeast", () => {
      it("returns true", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 2, column: 2 };

        const result = isNeighbor(me, them);

        expect(result).toBeTruthy();
      });
    });

    describe("with an adjacent cell to the southwest", () => {
      it("returns true", () => {
        const me = { row: 1, column: 1 };
        const them = { row: 2, column: 0 };

        const result = isNeighbor(me, them);

        expect(result).toBeTruthy();
      });
    });
  });
});
