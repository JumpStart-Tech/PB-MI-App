import { useState } from "react";
import { updateTherapist } from '../models/userData.js';

// allows the therapist data to be updated by calling updateTherapist from userData when the user changes information in the profile screen
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