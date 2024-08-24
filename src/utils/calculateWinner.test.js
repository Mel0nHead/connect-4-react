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

  expect(calculateWinner(gameState, [2, 2])).toEqual("yellow");
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

  expect(calculateWinner(gameState, [4, 5])).toEqual("red");
});

test.skip("should return winner if there are 4 consecutive squares (diagonal)", () => {
  const gameState = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "red",
    null,
    null,
    null,
    null,
    null,
    "red",
    "yellow",
    null,
    null,
    null,
    "yellow",
    "red",
    "red",
    "red",
    null,
    null,
    null,
    "red",
    "yellow",
    "yellow",
    "yellow",
    null,
    null,
    null,
  ];

  expect(calculateWinner(gameState, 17)).toEqual("red");
});

test.skip("should not return winner if there are not 4 consecutive squares (diagonal)", () => {
  const gameState = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "red",
    null,
    null,
    null,
    null,
    null,
    "yellow",
    "yellow",
    null,
    null,
    null,
    null,
    "red",
    "yellow",
    "red",
    null,
    null,
    "yellow",
    "red",
    "red",
    "red",
    "yellow",
    null,
    null,
    "red",
    "yellow",
    "yellow",
    "yellow",
    "red",
    null,
    "red",
  ];

  expect(calculateWinner(gameState, 11)).toEqual(null);
});
