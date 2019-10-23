import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Grid from ".";

describe("<Grid />", () => {
  const square = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];

  const mockHandleClick = jest.fn().mockName("mockHandleClick");

  beforeEach(() => {
    mockHandleClick.mockReset();
  });

  it("renders a grid with the correct number of rows", () => {
    const { getByTitle } = render(
      <Grid grid={square} onClick={mockHandleClick} />
    );
    const grid = getByTitle("Grid");
    expect(grid.getElementsByTagName("tr").length).toEqual(3);
  });

  it("renders a grid that has the correct number of columns", () => {
    const { getByTitle } = render(
      <Grid grid={square} onClick={mockHandleClick} />
    );
    const grid = getByTitle("Grid");
    const rows = grid.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      expect(rows[i].getElementsByTagName("td").length).toEqual(3);
    }
  });

  it("handles when a cell is clicked", () => {
    const { getByTitle } = render(
      <Grid grid={square} onClick={mockHandleClick} />
    );
    const grid = getByTitle("Grid");
    const rows = grid.getElementsByTagName("tr");
    const middleRowOfCells = rows[1].getElementsByTagName("td");
    const middleCell = middleRowOfCells[1];

    fireEvent.click(middleCell);

    expect(mockHandleClick).toHaveBeenCalledWith({ row: 1, column: 1 });
  });
});
