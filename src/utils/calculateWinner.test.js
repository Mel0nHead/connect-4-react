import calculateWinner from "./calculateWinner";

test("should return null if there are not 4 consecutive squares (column)", () => {
  const gameState = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, "yellow"],
    [null, null, null, null, null, null],
    [null, "red", "yellow", "red", "red", "red"],
    [null, null, null, null, null, "yellow"],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];

  expect(calculateWinner(gameState, [3, 1])).toEqual(null);
});

test("should return winner if there are 4 consecutive cells with same value in a column", () => {
  const gameState = [
    [null, null, null, null, null, null],
    [null, null, null, null, "red", "red"],
    [null, null, "yellow", "yellow", "yellow", "yellow"],
    [null, null, null, null, null, "red"],
    [null, null, null, null, null, null],
    [null, null, null, null, null, "red"],
    [null, null, null, null, null, null],
  ];

  expect(calculateWinner(gameState, [2, 2])).toEqual([
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
  ]);
});

test("should not return winner if there are not 4 consecutive squares (row)", () => {
  const gameState = [
    [null, null, null, null, null, "red"],
    [null, null, null, null, null, "yellow"],
    [null, null, null, null, "yellow", "red"],
    [null, null, null, null, "yellow", "red"],
    [null, null, null, null, null, "red"],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];

  expect(calculateWinner(gameState, [4, 5])).toEqual(null);
});

test("should return winner if there are 4 consecutive squares (row)", () => {
  const gameState = [
    [null, null, null, null, null, null],
    [null, null, null, null, "yellow", "red"],
    [null, null, null, null, null, "red"],
    [null, null, null, null, "yellow", "red"],
    [null, null, null, null, null, "red"],
    [null, null, null, null, null, "yellow"],
    [null, null, null, null, null, null],
  ];

  expect(calculateWinner(gameState, [4, 5])).toEqual([
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
  ]);
});

test("should not return winner if there are not 4 consecutive squares (ascending diagonal)", () => {
  const gameState = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, "red"],
    [null, null, null, null, "red", "yellow"],
    [null, null, null, "red", "yellow", "yellow"],
    [null, null, "yellow", "red", "yellow", "red"],
    [null, "red", "yellow", "red", "yellow", "red"],
    [null, null, null, null, null, null],
  ];

  expect(calculateWinner(gameState, [5, 1])).toEqual(null);
});

test("should return winner if there are 4 consecutive squares (ascending diagonal)", () => {
  const gameState = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, "red"],
    [null, null, null, null, "red", "yellow"],
    [null, null, null, "red", "yellow", "red"],
    [null, null, "red", "red", "yellow", "yellow"],
    [null, null, null, null, null, "yellow"],
    [null, null, null, null, null, null],
  ];

  expect(calculateWinner(gameState, [4, 2])).toEqual([
    [1, 5],
    [2, 4],
    [3, 3],
    [4, 2],
  ]);
});

test("should not return winner if there are not 4 consecutive squares (descending diagonal)", () => {
  const gameState = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, "red", "yellow", "red", "yellow", "yellow"],
    [null, null, "red", "red", "yellow", "red"],
    [null, null, null, "yellow", "red", "yellow"],
    [null, null, null, null, "red", "yellow"],
    [null, null, null, null, null, "red"],
  ];

  expect(calculateWinner(gameState, [2, 1])).toEqual(null);
});

test("should return winner if there are 4 consecutive squares (descending diagonal)", () => {
  const gameState = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, "yellow"],
    [null, null, null, null, null, null],
    [null, null, "red", "red", "yellow", "yellow"],
    [null, null, null, "red", "red", "yellow"],
    [null, null, null, null, "red", "yellow"],
    [null, null, null, null, null, "red"],
  ];

  expect(calculateWinner(gameState, [3, 2])).toEqual([
    [3, 2],
    [4, 3],
    [5, 4],
    [6, 5],
  ]);
});

test("should return null if game is a draw", () => {
  const gameState = [
    ["red", "red", "yellow", "yellow", "red", "red"],
    ["yellow", "yellow", "red", "red", "yellow", "yellow"],
    ["red", "red", "yellow", "yellow", "red", "red"],
    ["yellow", "yellow", "red", "red", "yellow", "yellow"],
    ["red", "red", "yellow", "yellow", "red", "red"],
    ["yellow", "yellow", "red", "red", "yellow", "yellow"],
    ["yellow", "red", "yellow", "red", "yellow", "red"],
  ];

  expect(calculateWinner(gameState, [1, 0])).toEqual(null);
});
