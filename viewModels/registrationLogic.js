import { useState } from 'react';
import { userIsNew, saveUserAuthInfo, validateCreds } from '../models/userData.js';
import { useUser } from './userContext.js';
export {useSignUpControls}

function useSignUpControls(navigation){
    const {setUser} = useUser(); //setUser lets you update the user context which can be accessed by every component
    const [nameError, setNameError] = useState(''); //These are returned and control the error message on each text input
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    function signUp(name, email, password, passwordC){ //This function is returned and is used in the sign up button onClick
        try{
            let nameErrorLocal = ''; //Error messages must be first put into these local variables rather than updating the state variables directly, because
            let emailErrorLocal = '';     //  state gets updated asynchronously and this function has an if statement which checks if the error messages are empty
            let passwordErrorLocal = '';
            let confirmPasswordErrorLocal = '';

            setNameError(''); //All the error state must be reset in case the user fixed an error that they had previously
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
                    if(nameErrorLocal === '' //if all error messages are empty, no errors so we can save the user and go to next screen
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
    return {nameError, emailError, passwordError, confirmPasswordError, signUp}; //all these get used in the registration component itself
}

