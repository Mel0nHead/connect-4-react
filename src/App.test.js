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

test("should populate a cell with the player's colour when clicked", async () => {
  const user = userEvent.setup();
  render(<App />);

  const gridCell = await screen.findByTestId("grid-cell-21");
  await user.click(gridCell);

  expect(await screen.findByTestId("grid-cell-21")).toHaveTextContent("red");
});

test("should not be able to change the value of a cell that already has a value", async () => {
  const user = userEvent.setup();
  render(<App />);

  const gridCell = await screen.findByTestId("grid-cell-21");
  await user.click(gridCell);

  expect(await screen.findByTestId("grid-cell-21")).toHaveTextContent("red");

  await user.click(await screen.findByTestId("grid-cell-21"));

  expect(await screen.findByTestId("grid-cell-21")).toHaveTextContent("red");
});

test("should only be able to populate the first available slot in column (starting from bottom)", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(await screen.findByTestId("grid-cell-14"));

  expect(await screen.findByTestId("grid-cell-35")).toHaveTextContent("red");
  expect(await screen.findByTestId("grid-cell-14")).not.toHaveTextContent(
    "red"
  );
});
