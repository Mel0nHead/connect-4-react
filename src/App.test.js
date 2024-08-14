import { render, screen } from "@testing-library/react";
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
