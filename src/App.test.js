import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

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

test("should update win count after someone wins", async () => {
  const user = userEvent.setup();
  render(<App />);

  const firstColumn = screen.getByTestId("grid-cell-0-0");
  const secondColumn = screen.getByTestId("grid-cell-1-0");

  await user.click(firstColumn);
  await user.click(secondColumn);
  await user.click(firstColumn);
  await user.click(secondColumn);
  await user.click(firstColumn);
  await user.click(secondColumn);
  await user.click(firstColumn);

  expect(screen.getByTestId("display-message")).toHaveTextContent("Red wins!");

  const winTalliesContainer = screen.getByTestId("win-tallies");

  expect(winTalliesContainer).toHaveTextContent("Yellow: 0");
  expect(winTalliesContainer).toHaveTextContent("Red: 1");
});

test("should declare game as a draw", async () => {
  const user = userEvent.setup();
  render(<App />);

  const winTalliesContainer = screen.getByTestId("win-tallies");

  expect(winTalliesContainer).toHaveTextContent("Yellow: 0");
  expect(winTalliesContainer).toHaveTextContent("Red: 0");

  const firstColumn = screen.getByTestId("grid-cell-0-0");
  const secondColumn = screen.getByTestId("grid-cell-1-0");
  const thirdColumn = screen.getByTestId("grid-cell-2-0");
  const fourthColumn = screen.getByTestId("grid-cell-3-0");
  const fifthColumn = screen.getByTestId("grid-cell-4-0");
  const sixthColumn = screen.getByTestId("grid-cell-5-0");
  const seventhColumn = screen.getByTestId("grid-cell-6-0");

  await user.click(secondColumn);
  await user.click(thirdColumn);
  await user.click(secondColumn);
  await user.click(thirdColumn);
  await user.click(thirdColumn);
  await user.click(secondColumn);
  await user.click(thirdColumn);
  await user.click(secondColumn);
  await user.click(secondColumn);
  await user.click(thirdColumn);
  await user.click(secondColumn);
  await user.click(thirdColumn);
  await user.click(fourthColumn);
  await user.click(fifthColumn);
  await user.click(fourthColumn);
  await user.click(fifthColumn);
  await user.click(fifthColumn);
  await user.click(fourthColumn);
  await user.click(fifthColumn);
  await user.click(fourthColumn);
  await user.click(fourthColumn);
  await user.click(fifthColumn);
  await user.click(fourthColumn);
  await user.click(fifthColumn);
  await user.click(sixthColumn);
  await user.click(seventhColumn);
  await user.click(sixthColumn);
  await user.click(seventhColumn);
  await user.click(seventhColumn);
  await user.click(sixthColumn);
  await user.click(seventhColumn);
  await user.click(sixthColumn);
  await user.click(sixthColumn);
  await user.click(seventhColumn);
  await user.click(sixthColumn);
  await user.click(seventhColumn);
  await user.click(firstColumn);
  await user.click(firstColumn);
  await user.click(firstColumn);
  await user.click(firstColumn);
  await user.click(firstColumn);
  await user.click(firstColumn);

  expect(screen.getByTestId("display-message")).toHaveTextContent(
    "It's a draw!"
  );
  expect(screen.getByText("Play again")).toBeVisible();
});

test("should store game state in local storage", async () => {
  localStorage.clear();
  const user = userEvent.setup();
  render(<App />);

  const storageKey = "gameState";

  expect(localStorage.getItem(storageKey)).toEqual(null);

  const firstColumn = screen.getByTestId("grid-cell-0-0");
  const fourthColumn = screen.getByTestId("grid-cell-3-0");

  await user.click(firstColumn);
  await user.click(firstColumn);

  await user.click(fourthColumn);
  await user.click(fourthColumn);

  const expectedGameState = [
    [null, null, null, null, "yellow", "red"],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, "yellow", "red"],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];

  const storedGameState = localStorage.getItem(storageKey);

  expect(JSON.parse(storedGameState)).toEqual(expectedGameState);
});

test("should initialise game with state from local storage", () => {
  const initialGameState = [
    [null, null, null, null, null, "red"],
    [null, null, null, null, null, "yellow"],
    [null, null, null, null, null, "red"],
    [null, null, null, null, null, "yellow"],
    [null, null, null, null, null, "red"],
    [null, null, null, null, null, "yellow"],
    [null, null, null, null, null, "red"],
  ];

  localStorage.setItem("gameState", JSON.stringify(initialGameState));

  render(<App />);

  expect(screen.getByTestId("grid-cell-0-5")).toHaveTextContent("red");
  expect(screen.getByTestId("grid-cell-1-5")).toHaveTextContent("yellow");
  expect(screen.getByTestId("grid-cell-2-5")).toHaveTextContent("red");
  expect(screen.getByTestId("grid-cell-3-5")).toHaveTextContent("yellow");
  expect(screen.getByTestId("grid-cell-4-5")).toHaveTextContent("red");
  expect(screen.getByTestId("grid-cell-5-5")).toHaveTextContent("yellow");
  expect(screen.getByTestId("grid-cell-6-5")).toHaveTextContent("red");
});

test("should save state in local storage after every turn", async () => {
  render(<App />);
  const user = userEvent.setup();

  const firstColumn = screen.getByTestId("grid-cell-0-0");
  const secondColumn = screen.getByTestId("grid-cell-1-0");

  await user.click(firstColumn);
  await user.click(secondColumn);

  await user.click(firstColumn);
  await user.click(secondColumn);

  const storedState = JSON.parse(localStorage.getItem("gameState"));

  expect(storedState).toEqual([
    [null, null, null, null, "red", "red"],
    [null, null, null, null, "yellow", "yellow"],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ]);
});

it("should initialise current turn from local storage", async () => {
  const initialGameState = [
    [null, null, null, null, null, "red"],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];

  localStorage.setItem("gameState", JSON.stringify(initialGameState));
  localStorage.setItem("mostRecentMove", JSON.stringify([0, 0]));

  render(<App />);

  expect(screen.getByTestId("display-message")).toHaveTextContent(
    "Current turn: yellow"
  );
});

it("should save most recent move in local storage after every turn", async () => {
  render(<App />);
  const user = userEvent.setup();

  const firstColumn = screen.getByTestId("grid-cell-0-0");
  const secondColumn = screen.getByTestId("grid-cell-1-0");

  await user.click(firstColumn);

  expect(localStorage.getItem("mostRecentMove")).toEqual("[0,5]");

  await user.click(secondColumn);

  expect(localStorage.getItem("mostRecentMove")).toEqual("[1,5]");
});

it("should initialise wins count from local storage", () => {
  localStorage.setItem("winsCount", JSON.stringify({ red: 1, yellow: 2 }));

  render(<App />);

  const winTalliesContainer = screen.getByTestId("win-tallies");

  expect(winTalliesContainer).toHaveTextContent("Yellow: 2");
  expect(winTalliesContainer).toHaveTextContent("Red: 1");
});
