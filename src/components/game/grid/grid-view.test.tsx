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
    const { getAllByTestId } = render(
      <Grid grid={square} onClick={mockHandleClick} />
    );
    expect(getAllByTestId(/cell-\d-0/).length).toEqual(3);
  });

  it("renders a grid with the correct number of cells", () => {
    const { getAllByTestId } = render(
      <Grid grid={square} onClick={mockHandleClick} />
    );
    expect(getAllByTestId(/cell-\d-\d/).length).toEqual(9);
  });

  it("renders a grid that has the correct number of columns", () => {
    const { getAllByTestId } = render(
      <Grid grid={square} onClick={mockHandleClick} />
    );
    expect(getAllByTestId(/cell-0-\d/).length).toEqual(3);
  });

  it("renders living and dead cells", () => {
    const liveGrid = [[false, true], [true, false]];

    const { getByTestId } = render(
      <Grid grid={liveGrid} onClick={mockHandleClick} />
    );
    expect(getByTestId("cell-0-0")).toHaveClass("dead");
    expect(getByTestId("cell-0-1")).toHaveClass("live");
    expect(getByTestId("cell-1-0")).toHaveClass("live");
    expect(getByTestId("cell-1-1")).toHaveClass("dead");
  });

  it("handles when a cell is clicked", () => {
    const { getByTestId } = render(
      <Grid grid={square} onClick={mockHandleClick} />
    );
    const middleCell = getByTestId("cell-1-1");

    fireEvent.click(middleCell);

    expect(mockHandleClick).toHaveBeenCalledWith({ row: 1, column: 1 });
  });
});
