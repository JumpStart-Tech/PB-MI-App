import { useState } from "react";
import {validateCreds } from "../models/userData.js";
import { useUser } from "./userContext.js";
export {useSignInControls}

function useSignInControls(navigation){
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const {setUser} = useUser();

    function signInClick(email, password){
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
                    }
                    else{
                        console.log('id: ' + res.id);
                        setUser({
                            
                        })
                        navigation.navigate('Home');
                    }
                })
        }
        catch(e){
            console.log('signIn error: ' + e);
        }
    }
    return {emailError, passwordError, signInClick};
}