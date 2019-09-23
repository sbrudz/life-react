import React from "react";
import { render } from "@testing-library/react";
import App from ".";

describe("<App />", () => {
  it("renders a title", () => {
    const { getByText } = render(<App />);
    expect(getByText("Conway's Game of Life")).toBeInTheDocument();
  });

  it("renders a grid section", () => {
    const { getByText } = render(<App />);
    expect(getByText("Grid")).toBeInTheDocument();
  });

  it("renders a rules section", () => {
    const { getByText } = render(<App />);
    expect(getByText("Rules")).toBeInTheDocument();
  });
});
