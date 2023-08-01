import { useState, useEffect, useRef } from "react";

export default function useSessionControls() {
  const [dangerousData, setDangerousData] = useState([]);
  const [nonDangerousData, setNonDangerousData] = useState([]);
  const [interactiveBehaviorData, setInteractiveBehaviorData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [calmnessData, setCalmnessData] = useState([]);
  const [reinforcementData, setReinforcementData] = useState([0, 0]); //SR is default
  const [milliseconds, setMilliseconds] = useState(0);
  const [redoAvailable, setRedoAvailable] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  let undos = useRef([]);
  let redos = useRef([]); //any time any action other than an undo is done, lastUndone must be cleared
  let startTime = useRef(null);
  const eoActive = reinforcementData.length % 2 == 1; //odd number of reinforcement data means eo is active
  //const eoPresses = (isRunning) ? Math.floor((reinforcementData.length + 1) / 2) : ((reinforcementData.length == 2) ? 0 : 1);
  const eoPresses = (() => {
    if (!isRunning) { //if it's being adjusted before the session starts, can only be 1 zero or 2 zeroes so those cases are hard coded
      if (reinforcementData.length == 2) {
        return 0;
      }
      return 1;
    }
    if (reinforcementData.length < 2 || reinforcementData[1] != 0) { //this case is where the session started with eo
      return Math.floor((reinforcementData.length - 1) / 2) + 1;
    }
    return Math.floor((reinforcementData.length - 1) / 2); //this case is where the session started with sr
  })();
  
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setMilliseconds(Date.now() - startTime.current);
      }, 100);
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

  function resetSession(){ //TODO: need to make this function

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
    setRedoAvailable(true);
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
    setRedoAvailable(redos.current.length > 0);
  }

  function addDangerous(behavior) {
    const timestamp = Date.now() - startTime.current;
    setDangerousData((dangerousData) => [
      ...dangerousData,
      [timestamp, behavior],
    ]);
    setRedoAvailable(false);
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
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setNonDangerousData(nonDangerousData.slice(0, -1));
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
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setInteractiveBehaviorData(interactiveBehaviorData.slice(0, -1));
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
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setEngagementData(engagementData.slice(0, -1));
      return () => {
        setEngagementData((engagementData) => [...engagementData, timestamp]);
      };
    };
    undos.current.push(undoFunction);
  }

  function addCalmness() {
    const timestamp = Date.now() - startTime.current;
    setCalmnessData((calmnessData) => [...calmnessData, timestamp]);
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setCalmnessData(calmnessData.slice(0, -1));
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
      setRedoAvailable(false);
      const undoFunction = () => {
        //undo function will return a redo function
        setReinforcementData(reinforcementData.slice(0, -1));
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

  return {
    startSession,
    endSession,
    resetSession,
    dangerousData,
    nonDangerousData,
    interactiveBehaviorData,
    engagementData,
    calmnessData,
    reinforcementData,
    milliseconds,
    redoAvailable,
    eoPresses,
    isRunning,
    undo,
    redo,
    addDangerous,
    addNonDangerous,
    addInteractive,
    addEngagement,
    addCalmness,
    addReinforcement,
    eoActive,
  };
}
