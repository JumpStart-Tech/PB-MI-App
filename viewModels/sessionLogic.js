import { useState, useEffect, useRef } from "react";

export default function useSessionControls(){
    let [dangerousData, setDangerousData] = useState([]);
    let [nonDangerousData, setNonDangerousData] = useState([]);
    let [interactiveBehaviorData, setInteractiveBehaviorData] = useState([]);
    let [engagementData, setEngagementData] = useState([]);
    let [calmnessData, setCalmnessData] = useState([]);
    let [reinforcementData, setReinforcementData] = useState([]);
    let [seconds, setSeconds] = useState(0);
    let [redoAvailable, setRedoAvailable] = useState(False);
    let undos = useRef([]);
    let redos = useRef([]); //any time any action other than an undo is done, lastUndone must be cleared

    function undo(){
        if(undos.current.length > 0){
            let undoFunction = undos.current.pop();
            let redoFunction = undoFunction();
            let updatedRedoFunction = () => {
                redoFunction();
                return undoFunction(); //redo function need to return the undo function so that the redo can be undone
            }
            redos.current.push(updatedRedoFunction);
        }
    }

    function redo(){
        if(redos.current.length > 0){
            let redoFunction = redos.current.pop();
            let undoFunction = redoFunction();
            let updatedUndoFunction = () => { //undo function need to return the redo function so that the undo can be redone
                undoFunction();
                return redoFunction();
            }
            undos.current.push(updatedUndoFunction);
        }
    }
}
