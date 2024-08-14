import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", async () => {
  render(<App />);
  const gridCells = await screen.findAllByTestId("grid-cell");
  expect(gridCells).toHaveLength(6 * 7);
});
