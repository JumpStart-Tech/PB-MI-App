import { userIsNew, saveUserAuthInfo } from "../models/userData";
export {signUp}

async function signUp(email, password){
    try{
        if(await userIsNew(email)){
            const temp = await saveUserAuthInfo(email, password);
            console.log(JSON.stringify(temp));
            return temp;
        }
    }
    catch(e){
        console.log('error: ' + e);
    }
}