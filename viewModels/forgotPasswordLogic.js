import { useState } from "react";
import { userExists } from '../models/userData.js';
import { useUser } from "./userContext.js";
import {newPassControls} from "./newPasswordLogic.js";
export {useControls}

function useControls(navigation){
    const [emailError, setEmailError] = useState('');
    const {setUser} = useUser();

    function click(email, setEmail){
        try{
            setEmailError('');
            userExists(email)
                .then(res => {
                    if(!res){
                        setEmailError('User does not exist.');
                    } else {
                        let userEmail = email;
                        setEmail('');
                        navigation.navigate('NewPassword', {data: userEmail});
                    }
                })
        }
        catch(e){
            console.log('signIn error: ' + e);
        }
    }
    return {emailError, click};
}