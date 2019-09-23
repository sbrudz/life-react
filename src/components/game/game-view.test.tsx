import React from "react";
import { render } from "@testing-library/react";
import Game from ".";

describe("<Game />", () => {
  it("renders a title", () => {
    const { getByText } = render(<Game />);
    expect(getByText("Game")).toBeInTheDocument();
  });
});
