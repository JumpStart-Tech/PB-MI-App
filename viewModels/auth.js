import { userIsNew, saveUserAuthInfo, validateCreds } from "../models/userData";
export {signUp, signIn}

async function signUp(email, password){
    try{
        if(await userIsNew(email)){
            const temp = await saveUserAuthInfo(email, password);
            console.log(JSON.stringify(temp));
            return temp;
        }
        else{
            return {status: 'Error', message: 'User already exists'};
        }
    }
    catch(e){
        console.log('signUp error: ' + e);
    }
}

async function signIn(email, password){
    try{
        const response = await validateCreds(email, password);
        console.log('response: ' + JSON.stringify(response));
        return response;
    }
    catch(e){
        console.log('signIn error: ' + e)
    }
}