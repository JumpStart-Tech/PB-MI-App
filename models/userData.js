export {userIsNew, saveUserAuthInfo}

async function userIsNew(email){
    const response = await fetch(`http://localhost:3000/authData?email=${email.toLowerCase()}`); //will be able to be done with signUp() in Amplify
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in userIsNew. status: ${response.status}`);
    }
    const responseObj = await response.json();
    if(responseObj.length > 0){
        console.log(`User with email ${email} already exists`);
        return false;
    }
    return true;
}

async function saveUserAuthInfo(email, password){
    const response = await fetch(`http://localhost:3000/authData`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        email: email.toLowerCase(),
                        password,
                    }
                )
            });
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in saveUserAuthInfo. status: ${response.status}`);
    }
    const {id} = await response.json()
    console.log('user created. identifier: ' + id);
    return {status: 'Success', message: 'User created', id};
}