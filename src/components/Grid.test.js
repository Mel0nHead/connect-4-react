import { render, screen } from "@testing-library/react";
import Grid from "./Grid";

test("should show winning squares if there is a winner", async () => {
  const gameState = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, "red", "red", "red", "red"],
    [null, null, null, "yellow", "yellow", "yellow"],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];

  render(
    <Grid
      onCellClick={jest.fn()}
      gameState={gameState}
      mostRecentMove={[2, 2]}
    />
  );

  const winningCell1 = await screen.findByTestId("grid-cell-16");
  const winningCell2 = await screen.findByTestId("grid-cell-23");
  const winningCell3 = await screen.findByTestId("grid-cell-30");
  const winningCell4 = await screen.findByTestId("grid-cell-37");

  expect(winningCell1).toHaveTextContent("W");
  expect(winningCell2).toHaveTextContent("W");
  expect(winningCell3).toHaveTextContent("W");
  expect(winningCell4).toHaveTextContent("W");

  const winningCells = screen.getAllByText("W");

  expect(winningCells).toHaveLength(4);
});
