import { useCallback, useState } from "react";
import { PLAYERS } from "../constants";

function useWinsCount() {
  const [winsCount, setWinsCount] = useState(
    JSON.parse(localStorage.getItem("winsCount")) || {
      [PLAYERS.Red]: 0,
      [PLAYERS.Yellow]: 0,
    }
  );

  const setState = useCallback((winner) => {
    setWinsCount((current) => {
      const updatedState = { ...current, [winner]: current[winner] + 1 };
      localStorage.setItem("winsCount", JSON.stringify(updatedState));
      return updatedState;
    });
  }, []);

  const resetWinsCount = useCallback(() => {
    const state = {
      [PLAYERS.Red]: 0,
      [PLAYERS.Yellow]: 0,
    };
    localStorage.setItem("winsCount", JSON.stringify(state));
    setWinsCount(state);
  }, []);

  return { winsCount, setWinsCount: setState, resetWinsCount };
}

export default useWinsCount;
