import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Game from ".";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

describe("<Game />", () => {
  it("renders a title", () => {
    const { getByText } = render(<Game />);
    expect(getByText("Game")).toBeInTheDocument();
  });

  it("renders a grid", () => {
    const { getByTestId } = render(<Game />);
    expect(getByTestId("Grid")).toBeInTheDocument();
  });

  it("renders a Step button", () => {
    const { getByText } = render(<Game />);
    expect(getByText("Step")).toBeInTheDocument();
  });

  it("renders a Size label and input", () => {
    const { getByLabelText } = render(<Game />);
    expect(getByLabelText("Grid Size")).toBeInTheDocument();
  });

  it("renders a Size input that defaults to 20", () => {
    const { getByLabelText } = render(<Game />);
    const sizeInput = getByLabelText("Grid Size");
    expect(sizeInput).toHaveValue(20);
  });

  it("renders a grid that has 20 rows", () => {
    const { getAllByTestId } = render(<Game />);
    expect(getAllByTestId(/cell-\d+-0/).length).toEqual(20);
  });

  it("renders a grid that has 20 columns", () => {
    const { getAllByTestId } = render(<Game />);
    expect(getAllByTestId(/cell-0-\d+/).length).toEqual(20);
  });

  it("resizes the grid when Size is changed", () => {
    const newSize = 25;
    const { getAllByTestId, getByLabelText } = render(<Game />);

    const sizeInput = getByLabelText("Grid Size");
    fireEvent.change(sizeInput, { target: { value: newSize } });

    expect(getAllByTestId(/cell-\d+-0/).length).toEqual(newSize);
    expect(getAllByTestId(/cell-0-\d+/).length).toEqual(newSize);
  });

  // This integration test case was needed to prove that clicking a cell actually updated the UI with the new state
  it("handles when a cell is clicked", () => {
    const { getByTestId } = render(<Game />);

    const aCell = getByTestId("cell-1-1");

    fireEvent.click(aCell);

    expect(getByTestId("cell-1-1")).toHaveClass("live");
  });

  // Another integration test -- not sure how to test the step button without actually doing a full integration test like this
  it("Evolves the game to the next generation when the Step button is clicked", () => {
    const { getByText, getByTestId } = render(<Game />);

    const aCell = getByTestId("cell-1-1");
    fireEvent.click(aCell);
    expect(getByTestId("cell-1-1")).toHaveClass("live");

    const stepButton = getByText("Step");
    fireEvent.click(stepButton);

    expect(getByTestId("cell-1-1")).toHaveClass("dead");
  });

  describe("when the game first starts", () => {
    it("has an enabled Play button", () => {
      const { getByText } = render(<Game />);
      const playButton = getByText("Play");
      expect(playButton).toBeEnabled();
    });

    it("has an enabled Step button", () => {
      const { getByText } = render(<Game />);
      const stepButton = getByText("Step");
      expect(stepButton).toBeEnabled();
    });

    it("has a disabled Stop button", () => {
      const { getByText } = render(<Game />);
      const stopButton = getByText("Stop");
      expect(stopButton).toBeDisabled();
    });

    it("has a disabled Clear button", () => {
      const { getByText } = render(<Game />);
      const clearButton = getByText("Clear");
      expect(clearButton).toBeDisabled();
    });
  });

  describe("when the Play button is clicked", () => {
    it("starts running the game", () => {
      const { getByText, getByTestId } = render(<Game />);
      const aCell = getByTestId("cell-1-1");
      fireEvent.click(aCell);

      const playButton = getByText("Play");
      fireEvent.click(playButton);

      act(() => {
        jest.advanceTimersByTime(1001);
      });

      expect(getByTestId("cell-1-1")).toHaveClass("dead");
    });

    it("enables the Stop button", () => {
      const { getByText } = render(<Game />);
      const playButton = getByText("Play");

      fireEvent.click(playButton);

      const stopButton = getByText("Stop");
      expect(stopButton).toBeEnabled();
    });

    it("disables the Play button", () => {
      const { getByText } = render(<Game />);
      const playButton = getByText("Play");

      fireEvent.click(playButton);

      expect(playButton).toBeDisabled();
    });

    it("disables the Step button", () => {
      const { getByText } = render(<Game />);
      const playButton = getByText("Play");

      fireEvent.click(playButton);

      const stepButton = getByText("Step");
      expect(stepButton).toBeDisabled();
    });
  });

  describe("when game is running and the Stop button is clicked", () => {
    it("stops running the game", () => {
      const { getByText, getByTestId } = render(<Game />);
      const aCell = getByTestId("cell-1-1");
      fireEvent.click(aCell);

      const playButton = getByText("Play");
      fireEvent.click(playButton);

      act(() => {
        jest.advanceTimersByTime(10);
      });

      const stopButton = getByText("Stop");
      fireEvent.click(stopButton);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(getByTestId("cell-1-1")).toHaveClass("live");
    });

    it("disables the Stop button", () => {
      const { getByText } = render(<Game />);
      const playButton = getByText("Play");
      fireEvent.click(playButton);

      const stopButton = getByText("Stop");
      fireEvent.click(stopButton);

      expect(stopButton).toBeDisabled();
    });

    it("enables the Play button", () => {
      const { getByText } = render(<Game />);
      const playButton = getByText("Play");
      fireEvent.click(playButton);

      const stopButton = getByText("Stop");
      fireEvent.click(stopButton);

      expect(playButton).toBeEnabled();
    });

    it("enables the Step button", () => {
      const { getByText } = render(<Game />);
      const playButton = getByText("Play");
      fireEvent.click(playButton);

      const stopButton = getByText("Stop");
      fireEvent.click(stopButton);

      const stepButton = getByText("Step");
      expect(stepButton).toBeEnabled();
    });
  });

  describe("the Clear button", () => {
    describe("when there are any live cells", () => {
      it("is enabled", () => {
        const { getByText, getByTestId } = render(<Game />);
        const aCell = getByTestId("cell-1-1");
        fireEvent.click(aCell);

        const clearButton = getByText("Clear");
        expect(clearButton).toBeEnabled();
      });
    });

    describe("when there are no live cells", () => {
      it("is disabled", () => {
        const { getByText, getByTestId } = render(<Game />);
        const aCell = getByTestId("cell-1-1");
        fireEvent.click(aCell);
        fireEvent.click(aCell);

        const clearButton = getByText("Clear");
        expect(clearButton).toBeDisabled();
      });
    });

    describe("when it is clicked", () => {
      it("clears all live cells from the game", () => {
        const { getByText, getByTestId } = render(<Game />);
        const aCell = getByTestId("cell-1-1");
        fireEvent.click(aCell);

        const clearButton = getByText("Clear");
        fireEvent.click(clearButton);

        expect(getByTestId("cell-1-1")).toHaveClass("dead");
      });
    });
  });
});
