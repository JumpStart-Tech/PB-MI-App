import { useState } from "react";
import {validateCreds } from "../models/userData.js";
export {useSignInControls}

function useSignInControls(navigation){
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    function signInClick(email, password, setEmail, setPass){
        try{
            setEmailError('');
            setPasswordError('');
            validateCreds(email, password)
                .then(res => {
                    if(res.status === 'Error'){
                        if(res.field === 'Email'){
                            console.log('email error');
                            setEmailError(res.message);
                        }
                        else if(res.field === 'Password'){
                            console.log('password error');
                            setPasswordError(res.message);
                        }
                    } else {
                        console.log('userId: ' + res.id);
                        setEmail('');
                        setPass('');
                        navigation.navigate('Home', {userId: res.id});
                    }
                })
        }
        catch(e){
            console.log('signIn error: ' + e);
        }
    }
    return {emailError, passwordError, signInClick};
}