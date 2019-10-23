import React from "react";
import { render } from "@testing-library/react";
import Grid from ".";

describe("<Grid />", () => {
  const square = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];

  it("renders a grid with the correct number of rows", () => {
    const { getByTitle } = render(<Grid grid={square} />);
    const grid = getByTitle("Grid");
    expect(grid.getElementsByTagName("tr").length).toEqual(3);
  });

  it("renders a grid that has the correct number of columns", () => {
    const { getByTitle } = render(<Grid grid={square} />);
    const grid = getByTitle("Grid");
    const rows = grid.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      expect(rows[i].getElementsByTagName("td").length).toEqual(3);
    }
  });
});
