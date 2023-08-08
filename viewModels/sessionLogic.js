import { useState, useEffect, useRef } from "react";

export default function useSessionControls() {
  const [dangerousData, setDangerousData] = useState([]);
  const [nonDangerousData, setNonDangerousData] = useState([]);
  const [interactiveBehaviorData, setInteractiveBehaviorData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [calmnessData, setCalmnessData] = useState([]);
  const [reinforcementData, setReinforcementData] = useState([0, 0]); //SR is default
  const [resetData, setResetData] = useState(null);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let undos = useRef([]);
  let redos = useRef([]); //any time any action other than an undo is done, redos must be cleared
  let startTime = useRef(null);
  const eoActive = reinforcementData.length % 2 == 1; //odd number of reinforcement data means eo is active
  const undoAvailable = undos.current.length > 0;
  const redoAvailable = redos.current.length > 0;

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setMilliseconds(Date.now() - startTime.current);
      }, 30); //this number determines the refresh rate of the chart
    }
    // clear interval on re-render to prevent multiple intervals from running
    return () => clearInterval(intervalId);
  }, [isRunning]);

  function startSession() {
    startTime.current = Date.now();
    setIsRunning(true);
  }

  function endSession() {
    //TODO: needs to redirect to summary screen
    setIsRunning(false);
  }

  function undo() {
    if (undos.current.length > 0) {
      let undoFunction = undos.current.pop();
      let redoFunction = undoFunction();
      let updatedRedoFunction = () => {
        redoFunction();
        return undoFunction; //redo function need to return the undo function so that the redo can be undone
      };
      redos.current.push(updatedRedoFunction);
    }
    //setRedoAvailable(true);
  }

  function redo() {
    if (redos.current.length > 0) {
      let redoFunction = redos.current.pop();
      let undoFunction = redoFunction();
      let updatedUndoFunction = () => {
        //undo function need to return the redo function so that the undo can be redone
        undoFunction();
        return redoFunction;
      };
      undos.current.push(updatedUndoFunction);
    }
    //setRedoAvailable(redos.current.length > 0);
  }

  function redoIsUnavailable() {
    //setRedoAvailable(false);
    redos.current = [];
  }

  function addDangerous(behavior) {
    const timestamp = Date.now() - startTime.current;
    setDangerousData((dangerousData) => [
      ...dangerousData,
      [timestamp, behavior],
    ]);
    redoIsUnavailable();
    const undoFunction = () => {
      //undo function will return a redo function
      setDangerousData((dangerousData) => dangerousData.slice(0, -1));
      return () => {
        setDangerousData((dangerousData) => [
          ...dangerousData,
          [timestamp, behavior],
        ]);
      };
    };
    undos.current.push(undoFunction);
  }

  function addNonDangerous(behavior) {
    const timestamp = Date.now() - startTime.current;
    setNonDangerousData((nonDangerousData) => [
      ...nonDangerousData,
      [timestamp, behavior],
    ]);
    redoIsUnavailable();
    const undoFunction = () => {
      //undo function will return a redo function
      setNonDangerousData((nonDangerousData) => nonDangerousData.slice(0, -1));
      return () => {
        setNonDangerousData((nonDangerousData) => [
          ...nonDangerousData,
          [timestamp, behavior],
        ]);
      };
    };
    undos.current.push(undoFunction);
  }

  function addInteractive(behavior) {
    const timestamp = Date.now() - startTime.current;
    setInteractiveBehaviorData((interactiveBehaviorData) => [
      ...interactiveBehaviorData,
      [timestamp, behavior],
    ]);
    redoIsUnavailable();
    const undoFunction = () => {
      //undo function will return a redo function
      setInteractiveBehaviorData((interactiveBehaviorData) =>
        interactiveBehaviorData.slice(0, -1)
      );
      return () => {
        setInteractiveBehaviorData((interactiveBehaviorData) => [
          ...interactiveBehaviorData,
          [timestamp, behavior],
        ]);
      };
    };
    undos.current.push(undoFunction);
  }

  function addEngagement() {
    const timestamp = Date.now() - startTime.current;
    setEngagementData((engagementData) => [...engagementData, timestamp]);
    redoIsUnavailable();
    const undoFunction = () => {
      //undo function will return a redo function
      setEngagementData((engagementData) => engagementData.slice(0, -1));
      return () => {
        setEngagementData((engagementData) => [...engagementData, timestamp]);
      };
    };
    undos.current.push(undoFunction);
  }

  function addCalmness() {
    const timestamp = Date.now() - startTime.current;
    setCalmnessData((calmnessData) => [...calmnessData, timestamp]);
    redoIsUnavailable();
    const undoFunction = () => {
      //undo function will return a redo function
      setCalmnessData((calmnessData) => calmnessData.slice(0, -1));
      return () => {
        setCalmnessData((calmnessData) => [...calmnessData, timestamp]);
      };
    };
    undos.current.push(undoFunction);
  }

  function addReinforcement(reinforcementType) {
    if (!isRunning) {
      //before the session is started, eo or sr can be selected (sr is default)
      if (reinforcementType == "EO") {
        setReinforcementData([0]);
      } else {
        setReinforcementData([0, 0]);
      }
    } else {
      const timestamp = Date.now() - startTime.current;
      setReinforcementData((reinforcementData) => [
        ...reinforcementData,
        timestamp,
      ]);
      redoIsUnavailable();
      const undoFunction = () => {
        //undo function will return a redo function
        setReinforcementData((reinforcementData) =>
          reinforcementData.slice(0, -1)
        );
        return () => {
          setReinforcementData((reinforcementData) => [
            ...reinforcementData,
            timestamp,
          ]);
        };
      };
      undos.current.push(undoFunction);
    }
  }

  function addReset() {
    const oldResetVal = resetData;
    const timestamp = Date.now() - startTime.current;
    setResetData(timestamp);
    redoIsUnavailable();
    const undoFunction = () => {
      //undo function will return a redo function
      setResetData(oldResetVal);
      return () => {
        setResetData(timestamp);
      };
    };
    undos.current.push(undoFunction);
  }

  return {
    startSession,
    endSession,
    dangerousData,
    nonDangerousData,
    interactiveBehaviorData,
    engagementData,
    calmnessData,
    reinforcementData,
    resetData,
    milliseconds,
    undoAvailable,
    redoAvailable,
    isRunning,
    undo,
    redo,
    addDangerous,
    addNonDangerous,
    addInteractive,
    addEngagement,
    addCalmness,
    addReinforcement,
    addReset,
    eoActive,
  };
}
