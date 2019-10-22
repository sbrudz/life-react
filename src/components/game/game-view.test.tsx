import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Game from ".";

describe("<Game />", () => {
  it("renders a title", () => {
    const { getByText } = render(<Game />);
    expect(getByText("Game")).toBeInTheDocument();
  });

  it("renders a grid", () => {
    const { getByTitle } = render(<Game />);
    expect(getByTitle("Grid")).toBeInTheDocument();
  });

  it("renders a Step button", () => {
    const { getByText } = render(<Game />);
    expect(getByText("Step")).toBeInTheDocument();
  });

  it("renders a Size label and input", () => {
    const { getByLabelText } = render(<Game />);
    expect(getByLabelText("Size")).toBeInTheDocument();
  });

  it("renders a Size input that defaults to 20", () => {
    const { getByLabelText } = render(<Game />);
    const sizeInput = getByLabelText("Size");
    expect(sizeInput).toHaveValue(20);
  });

  it("renders a grid that has 20 rows", () => {
    const { getByTitle } = render(<Game />);
    const grid = getByTitle("Grid");
    expect(grid.getElementsByTagName("tr").length).toEqual(20);
  });

  it("renders a grid that has 20 columns", () => {
    const { getByTitle } = render(<Game />);
    const grid = getByTitle("Grid");
    const rows = grid.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      expect(rows[i].getElementsByTagName("td").length).toEqual(20);
    }
  });

  it("resizes the grid when Size is changed", () => {
    const newSize = 25;
    const { getByTitle, getByLabelText } = render(<Game />);

    const sizeInput = getByLabelText("Size");
    fireEvent.change(sizeInput, { target: { value: newSize } });

    const grid = getByTitle("Grid");
    const rows = grid.getElementsByTagName("tr");
    expect(rows.length).toEqual(newSize);
    for (let i = 0; i < rows.length; i++) {
      expect(rows[i].getElementsByTagName("td").length).toEqual(newSize);
    }
  });
});
