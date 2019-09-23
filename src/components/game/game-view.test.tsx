import React from "react";
import { render } from "@testing-library/react";
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
});
