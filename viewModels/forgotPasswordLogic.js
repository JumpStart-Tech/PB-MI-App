import { useState } from "react";
import { userExists } from '../models/userData.js';
import {newPassControls} from "./newPasswordLogic.js";
export {useControls}

// checks to make sure email has an account associated with it by calling the userExists function from userData
function useControls(navigation){
    const [emailError, setEmailError] = useState('');

    function click(email, setEmail){
        try{
			//email error state will show on the input component if something goes wrong
            setEmailError('');
            userExists(email)
                .then(res => {
                    if(!res){
                        setEmailError('User does not exist.');
                    } else {
                        let userEmail = email;
                        setEmail('');
                        navigation.navigate('NewPassword', {userEmail});
                    }
                })
        }
        catch(e){
            console.log('signIn error: ' + e);
        }
    }
    return {emailError, click};
}