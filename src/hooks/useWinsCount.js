import { useState } from "react";
import { PLAYERS } from "../constants";

function useWinsCount() {
  const [winsCount, setWinsCount] = useState(
    JSON.parse(localStorage.getItem("winsCount")) || {
      [PLAYERS.Red]: 0,
      [PLAYERS.Yellow]: 0,
    }
  );

  function setState(winner) {
    setWinsCount((current) => {
      const updatedState = { ...current, [winner]: current[winner] + 1 };
      localStorage.setItem("winsCount", JSON.stringify(updatedState));
      return updatedState;
    });
  }

  return [winsCount, setState];
}

export default useWinsCount;
