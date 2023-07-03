import { useState } from "react";
import { userIsNew, saveUserAuthInfo, validateCreds } from '../models/userData.js';
import { useUser } from "./userContext.js";
export {useControls}

async function userExists(email){
    const response = await fetch(`http://localhost:3000/authData?email=${email.toLowerCase()}`);
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in userExists. status: ${response.status}`);
    }
    const responseObj = await response.json();
    if (!(responseObj.length > 0)) {
        console.log(`User with email ${email} does not exist.`);
        return false;
    }
    return true;
}

function useControls(navigation){
    const [emailError, setEmailError] = useState('');
    const {setUser} = useUser();

    function click(email){
        try{
            setEmailError('');
            userExists(email)
                .then(res => {
                    if(!res){
                        setEmailError('User does not exist.');
                    } else {
                        navigation.navigate('Onboarding');
                    }
                })
        }
        catch(e){
            console.log('signIn error: ' + e);
        }
    }
    return {emailError, click};
}