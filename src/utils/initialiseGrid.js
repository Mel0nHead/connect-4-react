const numberOfRows = 6;
const numberOfColumns = 7;

function initialiseGrid() {
  let count = 0;

  return [
    ...Array(numberOfRows).fill([...Array(numberOfColumns).fill(null)]),
  ].map((row) => {
    const newRow = row.map((_) => {
      const value = count;
      count++;
      return value;
    });

    return [newRow, String(Math.random())];
  });
}

export default initialiseGrid;
