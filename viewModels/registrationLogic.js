import { useState } from 'react';
import { userIsNew, saveUserAuthInfo, validateCreds } from '../models/userData.js';
import { useUser } from './userContext.js';
export {useSignUpControls}

function useSignUpControls(navigation){
    const {setUser} = useUser();
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    function signUp(name, email, password, passwordC){
        try{
            let nameErrorLocal = '';
            let emailErrorLocal = '';
            let passwordErrorLocal = '';
            let confirmPasswordErrorLocal = '';

            setNameError('');
            setEmailError('');
            setPasswordError('');
            setConfirmPasswordError('');
            if(name === ''){
                nameErrorLocal = 'Please enter a name';
            }
            if(password !== passwordC){
                confirmPasswordErrorLocal = 'Passwords do not match';
            }
            userIsNew(email)
                .then(res => {
                    if(!res){
                        emailErrorLocal = 'User already exists';
                    }
                    if(nameErrorLocal === ''
                    && emailErrorLocal === ''
                    && passwordErrorLocal === ''
                    && confirmPasswordErrorLocal === ''){
                        saveUserAuthInfo(email, password)
                            .then(res => {
                                console.log(JSON.stringify(res));
                                setUser(res.id);
                                navigation.navigate('NewLearner');
                            })
                    }
                    else{
                        setNameError(nameErrorLocal);
                        setEmailError(emailErrorLocal);
                        setPasswordError(passwordErrorLocal);
                        setConfirmPasswordError(confirmPasswordErrorLocal);
                    }
                })
        }
        catch(e){
            console.log('signUp error: ' + e);
        }
    }
    return {nameError, emailError, passwordError, confirmPasswordError, signUp};
}

