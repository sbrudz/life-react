import React from "react";
import { render } from "@testing-library/react";
import Grid from ".";

describe("<Grid />", () => {
  it("renders a title", () => {
    const { getByText } = render(<Grid />);
    expect(getByText("Grid")).toBeInTheDocument();
  });
});
