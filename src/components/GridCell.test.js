import { render, screen } from "@testing-library/react";
import GridCell from "./GridCell";

test("should not show a value if value is null", async () => {
  render(
    <GridCell
      onClick={jest.fn()}
      cellIndex={0}
      columnIndex={0}
      rowIndex={0}
      value={null}
      isWinningCell={false}
    />
  );

  const cell = await screen.findByTestId("grid-cell-0");

  expect(cell).not.toHaveTextContent("red");
  expect(cell).not.toHaveTextContent("yellow");
  expect(cell).not.toHaveTextContent("W");
});

test("should be yellow if value is yellow", async () => {
  render(
    <GridCell
      onClick={jest.fn()}
      cellIndex={0}
      columnIndex={0}
      rowIndex={0}
      value="yellow"
      isWinningCell={false}
    />
  );

  const cell = await screen.findByTestId("grid-cell-0");

  expect(cell).toHaveTextContent("yellow");
});

test("should be red if value is red", async () => {
  render(
    <GridCell
      onClick={jest.fn()}
      cellIndex={0}
      columnIndex={0}
      rowIndex={0}
      value="red"
      isWinningCell={false}
    />
  );

  const cell = await screen.findByTestId("grid-cell-0");

  expect(cell).toHaveTextContent("red");
});

test("should display 'W' if it is a winning cell", async () => {
  render(
    <GridCell
      onClick={jest.fn()}
      cellIndex={0}
      columnIndex={0}
      rowIndex={0}
      value="red"
      isWinningCell={true}
    />
  );

  const cell = await screen.findByTestId("grid-cell-0");

  expect(cell).toHaveTextContent("W");
});
