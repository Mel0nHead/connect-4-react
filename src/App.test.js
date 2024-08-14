import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

test("should display the correct number of grid cells", async () => {
  render(<App />);
  const gridCells = await screen.findAllByTestId("grid-cell");
  expect(gridCells).toHaveLength(6 * 7);
});

test("should display who's turn is next", () => {
  render(<App />);

  expect(screen.getByText(/Current turn: red/));
});

test("should change the user's turn when current user make their move", async () => {
  const user = userEvent.setup();
  render(<App />);

  const gridCells = await screen.findAllByTestId("grid-cell");
  await user.click(gridCells[0]);

  expect(screen.getByText(/Current turn: yellow/));
});
