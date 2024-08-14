import "./App.css";
import initialiseGrid from "./utils/initialiseGrid";

const cellSize = 60;

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <div>
        <p>Current turn: red</p>
        <div>
          {initialiseGrid().map((row, i) => {
            return (
              <div style={{ display: "flex" }} key={i}>
                {row.map((cell) => (
                  <div
                    key={cell}
                    style={{
                      border: "1px solid",
                      height: cellSize,
                      width: cellSize,
                    }}
                    data-testid="grid-cell"
                  ></div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
