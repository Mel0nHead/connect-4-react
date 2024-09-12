import { useState } from "react";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "../constants";

// TODO:
// refactor
function getInitialGameState() {
  const storedState = localStorage.getItem("gameState");

  const initialGameState = [
    ...Array(NUMBER_OF_COLUMNS).fill([...Array(NUMBER_OF_ROWS).fill(null)]),
  ];

  if (!storedState) return initialGameState;

  try {
    const parsedResult = JSON.parse(storedState);
    return parsedResult;
  } catch (e) {
    return initialGameState;
  }
}

function updateGameState(currentGameState, columnIndex, rowIndex, newValue) {
  const column = currentGameState[columnIndex];
  const colSlice1 = column.slice(0, rowIndex);
  const colSlice2 = column.slice(rowIndex + 1);

  const updatedColumn = [...colSlice1, newValue, ...colSlice2];

  const stateSlice1 = currentGameState.slice(0, columnIndex);
  const stateSlice2 = currentGameState.slice(columnIndex + 1);

  return [...stateSlice1, updatedColumn, ...stateSlice2];
}

function useGameState() {
  const [gameState, setGameState] = useState(() => getInitialGameState());

  function setState(cellCoordinates, value) {
    const [columnIndex, rowIndex] = cellCoordinates;

    const updatedState = updateGameState(
      gameState,
      columnIndex,
      rowIndex,
      value
    );

    localStorage.setItem("gameState", JSON.stringify(updatedState));

    setGameState(updatedState);
  }

  function resetGameState() {
    const initialGameState = [
      ...Array(NUMBER_OF_COLUMNS).fill([...Array(NUMBER_OF_ROWS).fill(null)]),
    ];

    localStorage.setItem("gameState", JSON.stringify(initialGameState));

    setGameState(initialGameState);
  }

  return { gameState, updateGameState: setState, resetGameState };
}

export default useGameState;
