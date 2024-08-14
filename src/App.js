import logo from "./logo.svg";
import "./App.css";

const numberOfRows = 6;
const numberOfColumns = 7;

const cells = [...Array(42).keys()];

function App() {
  return (
    <div>
      {cells.map((cellIndex) => (
        <div key={cellIndex} data-testid="grid-cell"></div>
      ))}
    </div>
  );
}

export default App;
