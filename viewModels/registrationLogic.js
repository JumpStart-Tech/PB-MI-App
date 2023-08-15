import { useState } from 'react';
import { userIsNew, saveUserAuthInfo, validateCreds } from '../models/userData.js';
export {useSignUpControls}

function useSignUpControls(navigation){
    const [nameError, setNameError] = useState(''); //These are returned and control the error message on each text input
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // function checks that password is at least 6 characters and includes at least one number
    const passwordIsValid = (password) => {
      const passwordRegex = /^(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
    };

    const emailIsValid = (email) => {
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
        return emailRegex.test(email);
    }
    
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
                nameErrorLocal = 'Please enter a name.';
            }
            if (email === '') {
                emailErrorLocal = 'Please enter an email.';
            } else if (!emailIsValid(email)) {
                emailErrorLocal = 'Email format not valid.';
            }
            if(password === ''){
                passwordErrorLocal = 'Please enter a password.';
            } else if (!passwordIsValid(password)) {
                passwordErrorLocal = 'Password must be at least 8 characters and include a number.';
            }
            if(password !== passwordC){
                confirmPasswordErrorLocal = 'Passwords do not match.';
            }
            userIsNew(email)
                .then(res => {
                    if(!res){
                        emailErrorLocal = 'User already exists.';
                    }
                    if(nameErrorLocal === '' //if all error messages are empty, no errors so we can save the user and go to next screen
                    && emailErrorLocal === ''
                    && passwordErrorLocal === ''
                    && confirmPasswordErrorLocal === ''){
                        saveUserAuthInfo(email, password, name)
                            .then(res => {
                                console.log(JSON.stringify(res));
                                if(res.status == 'Success'){
                                    navigation.navigate('NewLearner', {userId: res.id});
                                }
                                else{
                                    switch(res.errorLocation){
                                        case email:
                                            setEmailError(res.message);
                                            break;
                                        case password:
                                            setPasswordError(res.message);
                                            break;
                                        default:
                                            setConfirmPasswordError(res.message);
                                    }
                                }
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
    return {nameError, emailError, passwordError, confirmPasswordError, signUp, passwordIsValid}; //all these get used in the registration component itself
}

