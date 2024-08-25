function updateGameState(currentGameState, columnIndex, rowIndex, newValue) {
  const column = currentGameState[columnIndex];
  const colSlice1 = column.slice(0, rowIndex);
  const colSlice2 = column.slice(rowIndex + 1);

  const updatedColumn = [...colSlice1, newValue, ...colSlice2];

  const stateSlice1 = currentGameState.slice(0, columnIndex);
  const stateSlice2 = currentGameState.slice(columnIndex + 1);

  return [...stateSlice1, updatedColumn, ...stateSlice2];
}

export default updateGameState;
