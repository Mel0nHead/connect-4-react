import calculateWinner from "./calculateWinner";

test("should return null if there is no winner", () => {
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
    "yellow",
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
    null,
    "yellow",
    null,
    null,
    null,
    null,
    null,
    null,
    "yellow",
    null,
    "red",
    null,
    "red",
    null,
    "red",
    "yellow",
    null,
  ];

  expect(calculateWinner(gameState, 12)).toEqual(null);
});

test("should return winner if there are 4 consecutive cells with same value in a column", () => {
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
    "red",
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
    null,
    "red",
    null,
    null,
    null,
    null,
    "yellow",
    null,
    "red",
    null,
    null,
    null,
    "red",
    "yellow",
    null,
    "yellow",
    null,
    null,
    "yellow",
  ];

  expect(calculateWinner(gameState, 10)).toEqual("red");
});

test("should not return winner if there are not 4 consecutive squares (row)", () => {
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
    "red",
    null,
    null,
    null,
    "red",
    "yellow",
    "yellow",
    "red",
    "yellow",
    "yellow",
  ];

  expect(calculateWinner(gameState, 41)).toEqual(null);
});

it("should return winner if there are 4 consecutive squares (row)", () => {
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
    "yellow",
    null,
    "yellow",
    null,
    null,
    null,
    null,
    "red",
    "red",
    "red",
    "red",
    "yellow",
    null,
    null,
  ];

  expect(calculateWinner(gameState, 38)).toEqual("red");
});

it.skip("should return winner if there are 4 consecutive squares (diagonal)", () => {
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

it("should not return winner if there are not 4 consecutive squares (diagonal)", () => {
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
