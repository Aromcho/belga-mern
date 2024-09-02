import { useState, useRef } from "react";

export function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const dataRef = useRef(initialState);

  const setMergedState = (newState) => {
    setState((prevState) => {
      const mergeState = Object.assign({}, prevState, newState);
      dataRef.current = mergeState;
      return mergeState;
    });
  };

  return [state, setMergedState, dataRef];
}
