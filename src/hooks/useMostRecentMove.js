import { useState } from "react";

const localStorageKey = "mostRecentMove";

function getInitialState() {
  try {
    const initialState = localStorage.getItem(localStorageKey);
    return JSON.parse(initialState);
  } catch (e) {
    return null;
  }
}

function useMostRecentMove() {
  const [mostRecentMove, setMostRecentMove] = useState(getInitialState);

  function setState(cellCoordinates) {
    setMostRecentMove(cellCoordinates);

    if (cellCoordinates) {
      localStorage.setItem(localStorageKey, JSON.stringify(cellCoordinates));
    } else {
      localStorage.removeItem(localStorageKey);
    }
  }

  return [mostRecentMove, setState];
}

export default useMostRecentMove;
