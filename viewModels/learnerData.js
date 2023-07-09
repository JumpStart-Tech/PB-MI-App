import { getLearnerArray } from "../models/userData";
import { useState, useEffect } from "react";
export {usePatients};

function usePatients(therapistId){
    const [patients, setPatients] = useState([])
    try{
        useEffect(() =>{
            getLearnerArray(therapistId)
                .then(patientsArray => {
                    setPatients(patientsArray);
                })
        } ,[])
        return patients;
    } catch(e){
        console.log('Error in obtaining learner data: ' + e);
        return "";
    }
}