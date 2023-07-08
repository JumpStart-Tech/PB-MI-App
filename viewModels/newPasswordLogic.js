import { useState } from "react";
import { changePassword } from '../models/userData.js';
export {newPassControls}
import { useSignUpControls } from "./registrationLogic"
import {useControls} from "./forgotPasswordLogic"


function newPassControls(navigation){
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const {passwordIsValid} = useSignUpControls(navigation);

    function click(email, password, setPassword, passwordC, setPasswordC){
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
                    // TODO: must update already exisiting user password
                        changePassword(email, password)
                            .then(res => {
                                console.log(JSON.stringify(res));
                                setPassword('');
                                setPasswordC('');
                                navigation.navigate('Onboarding', {userId: res.id});
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