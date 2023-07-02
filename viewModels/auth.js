import { userIsNew, saveUserAuthInfo, validateCreds } from "../models/userData.js";
export {signUp}

async function signUp(email, password){
    try{
        if(await userIsNew(email)){
            const temp = await saveUserAuthInfo(email, password);
            console.log(JSON.stringify(temp));
            return temp;
        }
        else{
            return {status: 'Error', message: 'User already exists', field: 'Email'};
        }
    }
    catch(e){
        console.log('signUp error: ' + e);
    }
}

