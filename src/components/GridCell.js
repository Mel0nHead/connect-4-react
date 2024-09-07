import { CELL_SIZE } from "../constants";
import GameToken from "./GameToken";

function GridCell({
  onClick,
  value,
  isWinningCell,
  onMouseEnter,
  onMouseLeave,
  rowIndex,
  columnIndex,
}) {
  return (
    <div
      role="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        border: "1px solid",
        height: CELL_SIZE,
        width: CELL_SIZE,
        padding: 5,
        background: isWinningCell ? "#3bfa3b" : "none",
      }}
      data-testid={`grid-cell-${columnIndex}-${rowIndex}`}
    >
      {isWinningCell ? <span style={{ display: "none" }}>W</span> : null}
      {value ? <GameToken value={value} /> : null}
    </div>
  );
}

export default GridCell;
