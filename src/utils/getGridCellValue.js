function getGridCellValue(gridState, cellCoordinates) {
  return gridState[cellCoordinates[0]][cellCoordinates[1]];
}

export default getGridCellValue;
