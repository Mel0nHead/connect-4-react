import { useState } from "react";
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "../constants";

const localStorageKey = "gameState";

function getInitialGridState() {
  const storedState = localStorage.getItem(localStorageKey);

  const initialGridState = [
    ...Array(NUMBER_OF_COLUMNS).fill([...Array(NUMBER_OF_ROWS).fill(null)]),
  ];

  if (!storedState) return initialGridState;

  try {
    const parsedResult = JSON.parse(storedState);
    return parsedResult;
  } catch (e) {
    return initialGridState;
  }
}

function updateGridState(currentGameState, columnIndex, rowIndex, newValue) {
  const column = currentGameState[columnIndex];
  const colSlice1 = column.slice(0, rowIndex);
  const colSlice2 = column.slice(rowIndex + 1);

  const updatedColumn = [...colSlice1, newValue, ...colSlice2];

  const stateSlice1 = currentGameState.slice(0, columnIndex);
  const stateSlice2 = currentGameState.slice(columnIndex + 1);

  return [...stateSlice1, updatedColumn, ...stateSlice2];
}

function useGridState() {
  const [gridState, setGridState] = useState(() => getInitialGridState());

  function setState(cellCoordinates, value) {
    const [columnIndex, rowIndex] = cellCoordinates;

    const updatedState = updateGridState(
      gridState,
      columnIndex,
      rowIndex,
      value
    );

    localStorage.setItem(localStorageKey, JSON.stringify(updatedState));

    setGridState(updatedState);
  }

  function resetGridState() {
    const initialGridState = [
      ...Array(NUMBER_OF_COLUMNS).fill([...Array(NUMBER_OF_ROWS).fill(null)]),
    ];

    localStorage.setItem(localStorageKey, JSON.stringify(initialGridState));

    setGridState(initialGridState);
  }

  return { gridState: gridState, updateGridState: setState, resetGridState };
}

export default useGridState;
