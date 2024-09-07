import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

test("should display the correct number of grid cells", async () => {
  render(<App />);
  const gridCells = await screen.findAllByTestId(/grid-cell-/);
  expect(gridCells).toHaveLength(6 * 7);
});

test("should display who's turn is next", () => {
  render(<App />);

  expect(screen.getByText(/Current turn: red/)).toBeVisible();
});

test("should change the user's turn when current user make their move", async () => {
  const user = userEvent.setup();
  render(<App />);

  const gridCells = await screen.findAllByTestId(/grid-cell-/);
  await user.click(gridCells[0]);

  expect(screen.getByText(/Current turn: yellow/)).toBeVisible();
});

test("should not be able to change the value of a cell that already has a value", async () => {
  const user = userEvent.setup();
  render(<App />);

  const testId = "grid-cell-0-5";

  const gridCell = await screen.findByTestId(testId);
  await user.click(gridCell);

  expect(await screen.findByTestId(testId)).toHaveTextContent("red");

  await user.click(await screen.findByTestId(testId));

  expect(await screen.findByTestId(testId)).toHaveTextContent("red");
});

test("should only be able to populate the first available slot in column (starting from bottom)", async () => {
  const user = userEvent.setup();
  render(<App />);
  const testId1 = "grid-cell-0-2";
  const testId2 = "grid-cell-0-5";

  await user.click(await screen.findByTestId(testId1));

  expect(await screen.findByTestId(testId2)).toHaveTextContent("red");
  expect(await screen.findByTestId(testId1)).not.toHaveTextContent("red");
});

test("should initially show win tallies as 0", () => {
  render(<App />);

  const winTalliesContainer = screen.getByTestId("win-tallies");

  expect(winTalliesContainer).toHaveTextContent("Wins");
  expect(winTalliesContainer).toHaveTextContent("Red: 0");
  expect(winTalliesContainer).toHaveTextContent("Yellow: 0");
});
