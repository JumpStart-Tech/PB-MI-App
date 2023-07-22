import { useState, useEffect, useRef } from "react";

export default function useSessionControls() {
  const [dangerousData, setDangerousData] = useState([]);
  const [nonDangerousData, setNonDangerousData] = useState([]);
  const [interactiveBehaviorData, setInteractiveBehaviorData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [calmnessData, setCalmnessData] = useState([]);
  const [reinforcementData, setReinforcementData] = useState([]);
  const [milliseconds, setMilliseconds] = useState(0);
  const [redoAvailable, setRedoAvailable] = useState(false);
  let undos = useRef([]);
  let redos = useRef([]); //any time any action other than an undo is done, lastUndone must be cleared
  const startTime = useRef(Date.now());

  function undo() {
    if (undos.current.length > 0) {
      let undoFunction = undos.current.pop();
      let redoFunction = undoFunction();
      let updatedRedoFunction = () => {
        redoFunction();
        return undoFunction(); //redo function need to return the undo function so that the redo can be undone
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
        return redoFunction();
      };
      undos.current.push(updatedUndoFunction);
    }
    setRedoAvailable(redos.current.length > 0);
  }

  function addDangerous(behavior) {
    const timestamp = Date.now() - startTime.current;
    setDangerousData(...dangerousData, [timestamp, behavior]);
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setDangerousData(dangerousData.slice(0, -1));
      return () => {
        setDangerousData(...dangerousData, [timestamp, behavior]);
      };
    };
    undos.current.push(undoFunction);
  }

  function addNonDangerous(behavior) {
    const timestamp = Date.now() - startTime.current;
    setNonDangerousData(...nonDangerousData, [timestamp, behavior]);
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setNonDangerousData(nonDangerousData.slice(0, -1));
      return () => {
        setNonDangerousData(...nonDangerousData, [timestamp, behavior]);
      };
    };
    undos.current.push(undoFunction);
  }

  function addInteractive(behavior) {
    const timestamp = Date.now() - startTime.current;
    setInteractiveBehaviorData(...interactiveBehaviorData, [
      timestamp,
      behavior,
    ]);
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setInteractiveBehaviorData(interactiveBehaviorData.slice(0, -1));
      return () => {
        setInteractiveBehaviorData(...interactiveBehaviorData, [
          timestamp,
          behavior,
        ]);
      };
    };
    undos.current.push(undoFunction);
  }

  function addEngagement() {
    const timestamp = Date.now() - startTime.current;
    setEngagementData(...engagementData, timestamp);
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setEngagementData(engagementData.slice(0, -1));
      return () => {
        setEngagementData(...engagementData, timestamp);
      };
    };
    undos.current.push(undoFunction);
  }

  function addCalmness() {
    const timestamp = Date.now() - startTime.current;
    setCalmnessData(...calmnessData, timestamp);
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setCalmnessData(calmnessData.slice(0, -1));
      return () => {
        setCalmnessData(...calmnessData, timestamp);
      };
    };
    undos.current.push(undoFunction);
  }

  function addReinforcement() {
    const timestamp = Date.now() - startTime.current;
    setReinforcementData(...reinforcementData, timestamp);
    setRedoAvailable(false);
    const undoFunction = () => {
      //undo function will return a redo function
      setReinforcementData(reinforcementData.slice(0, -1));
      return () => {
        setReinforcementData(...reinforcementData, timestamp);
      };
    };
    undos.current.push(undoFunction);
  }

  return {
    dangerousData,
    nonDangerousData,
    interactiveBehaviorData,
    engagementData,
    calmnessData,
    reinforcementData,
    milliseconds,
    redoAvailable,
  };
}
