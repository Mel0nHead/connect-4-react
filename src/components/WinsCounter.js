function WinsCounter({ winsCount }) {
  return (
    <div data-testid="win-tallies">
      <h2>Wins</h2>
      <span>
        Red: {winsCount.red}, Yellow: {winsCount.yellow}
      </span>
    </div>
  );
}

export default WinsCounter;
