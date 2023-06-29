export {userIsNew, saveUserAuthInfo, validateCreds, getLearnerArray}

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

async function validateCreds(email, password){
    const response = await fetch(`http://localhost:3000/authData?email=${email.toLowerCase()}`); //will be able to be done with signUp() in Amplify
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in validateCreds. status: ${response.status}`);
    }
    const responseArray = await response.json(); //the db query returns an array
    if(responseArray.length == 0){
        console.log(`User with email ${email} doesn't exist.`);
        return {status: 'Error', message: "Email doesn't exist"};
    }
    const responseObj = responseArray[0]; //array should always have 1 element at this point b/c only 1 account can be created per email
    if(responseObj.password != password){
        console.log('User entered incorrect password');
        return {status: 'Error', message: 'Incorrect password'};
    }
    return {status: 'Success', message: 'User credentials authenticated', id: responseObj.id}
}

async function getLearnerArray(therapistId){
    const response = await fetch(`http://localhost:3000/therapists?id=${therapistId}`);
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in pullLearnerInfo. status: ${response.status}`);
    }
    const responseArr = await response.json();
    return responseArr[0]['patients'];
}