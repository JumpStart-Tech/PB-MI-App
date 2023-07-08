import { getLearnerArray } from "../models/userData";
import { useState, useEffect } from "react";
export {usePatients};

function usePatients(therapistId){
    const [patients, setPatients] = useState([])
    useEffect(() =>{
        getLearnerArray(therapistId)
            .then(patientsArray => {
                setPatients(patientsArray);
            })
    } ,[])
    return patients;
}