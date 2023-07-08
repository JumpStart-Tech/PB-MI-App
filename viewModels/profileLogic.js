import { useState } from "react";
import { updateTherapist } from '../models/userData.js';

function profileControls(navigation, route){
    const [updateError, setUpdateError] = useState('');

    function click(userId, updatedData){
        try{
            updateTherapist(userId, updatedData)
                            .then(res => {
                                console.log(JSON.stringify(res));
                                setUpdateError('');
                            })
        }
        catch(e){
            console.log('Therapist update error: ' + e);
        }
    }
    return {updateError, click};
}

export {profileControls}