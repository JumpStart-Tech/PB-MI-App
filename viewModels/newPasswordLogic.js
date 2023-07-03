import { useState } from "react";
import { userIsNew, saveUserAuthInfo, validateCreds } from '../models/userData.js';
import { useUser } from "./userContext.js";
export {newPassControls}
import { useSignUpControls } from "./registrationLogic"
import {useControls} from "./forgotPasswordLogic"


function newPassControls(navigation){
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const {setUser} = useUser();
    //todo: must take email parameter
    const email = "hgevlwipr@hotmail.com";

    const {passwordIsValid} = useSignUpControls(navigation);

    function click(password, passwordC){
        try{
            let passwordErrorLocal = '';
            let confirmPasswordErrorLocal = '';

            setPasswordError('');
            setConfirmPasswordError('');
            
            if(password === ''){
                passwordErrorLocal = 'Please enter a password.';
            } else if (!passwordIsValid(password)) {
                passwordErrorLocal = 'Password length must be at least 6 characters and include a number.';
            }
            if(password !== passwordC){
                confirmPasswordErrorLocal = 'Passwords do not match.';
            }
                    if (passwordErrorLocal === '' && confirmPasswordErrorLocal === ''){
                        saveUserAuthInfo(email, password)
                            .then(res => {
                                console.log(JSON.stringify(res));
                                setUser(res.id);
                                navigation.navigate('Onboarding');
                            })
                           
                    }
                    else{
                        setPasswordError(passwordErrorLocal);
                        setConfirmPasswordError(confirmPasswordErrorLocal);
                    }
        }
        catch(e){
            console.log('New password error: ' + e);
        }
    }
    return {passwordError, confirmPasswordError, click};
}