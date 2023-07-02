import { useState } from "react";
import { userIsNew, saveUserAuthInfo, validateCreds } from "../models/userData.js";
import { useUser } from "./userContext.js";
export {useSignUpControls}

function useSignUpControls(navigation){
    const {setUser} = useUser();
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    function signUp(name, email, password, passwordC){
        try{
            setNameError('');
            setEmailError('');
            setPasswordError('');
            setConfirmPasswordError('');
            if(name === ''){
                setNameError('Please enter a name');
            }
            if(password !== passwordC){
                setConfirmPasswordError('Passwords do not match');
            }
            userIsNew(email)
                .then(res => {
                    if(!res){
                        setEmailError('User already exists');
                    }
                })

            console.log('nameerror: ' + nameError);
            console.log('emailError: ' + emailError);
            console.log('passwordError: ' + passwordError);
            console.log('confirmPasswordError: ' + confirmPasswordError);

            if(nameError === ''
            && emailError === ''
            && passwordError === ''
            && confirmPasswordError === ''){
                saveUserAuthInfo(email, password)
                    .then(res => {
                        console.log(JSON.stringify(res));
                        setUser(res.id);
                        navigation.navigate('NewLearner');
                    })
            }
        }
        catch(e){
            console.log('signUp error: ' + e);
        }
    }
    return {nameError, emailError, passwordError, confirmPasswordError, signUp};
}

