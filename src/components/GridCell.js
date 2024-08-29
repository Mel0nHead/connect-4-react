const CELL_SIZE = 60;

function GridCell({
  onClick,
  cellIndex,
  value,
  columnIndex,
  rowIndex,
  isWinningCell,
}) {
  return (
    <div
      role="button"
      onClick={onClick}
      style={{
        border: "1px solid",
        height: CELL_SIZE,
        width: CELL_SIZE,
        background: value || "none",
      }}
      data-testid={`grid-cell-${cellIndex}`}
    >
      <span>
        {columnIndex}, {rowIndex}
      </span>
      {isWinningCell ? <span>W</span> : null}
      {value ? <span style={{ display: "none" }}>{value}</span> : null}
    </div>
  );
}

export default GridCell;
